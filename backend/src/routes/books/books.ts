import { FastifyPluginAsyncTypebox, Type } from '@fastify/type-provider-typebox';
import { query } from "../../services/database.js";
import { BookPostSchema, BookPostType, BookSchema } from '../../schemas/book/bookSchema.js';
import { UserType } from '../../schemas/user/userSchema.js';
import { GenresResponseSchema } from '../../schemas/book/bookSchema.js';

const bookRoutes: FastifyPluginAsyncTypebox = async (fastify, opts): Promise<void> => {

  fastify.get('/', {
    schema: {
      tags: ['books'],
      summary: "Ruta para listar todos los libros publicados",
      description: "Muestra todos los libros publicados",
      response: {
        //Devolver lista de libros
        200: {
          type: 'array',
          params: BookSchema,
          description: "Lista de libros publicados"
        },
        404: Type.Object({ message: Type.String() }),
      }
    },
  handler: async (request, reply) => {
      const res = await query (
        `SELECT * FROM libros`
      );
      if (res.rowCount === 0) {
        return reply.status(404).send({ message: "No hay ningún libro publicado" });
      }
      const all_books = res.rows;
      return all_books;
    }
  });

  fastify.get('/:id', {
    schema: {
      tags: ['books'],
      summary: "Ruta para obtener un libro por ID",
      description: "Permite al usuario obtener los datos de un libro por su ID",
      params: {
        type: 'object',
        properties: {
          id: { type: 'string' }
        },
        required: ['id']
      },
      response: {
        200: BookSchema,
        404: Type.Object({message: Type.String()}),
      }
    },
    handler: async (request, reply) => {
      const {id} = request.params as { id: number };
      const res = await query (
        `SELECT * FROM libros WHERE id = $1`,
        [id]
      );
      if (res.rowCount === 0) {
        return reply.status(404).send({ message: "Libro no encontrado" });
      }
      const book = res.rows[0];
      return book;
    }
  });

  fastify.get('/owned', {
    schema: {
      tags: ['books'],
      summary: "Ruta para mostrar todos los libros publicados por el usuario",
      description: "Muestra los libros que hayan sido publicados por el usuario",
      response: {
        200: {
          type: 'array',
          params: BookSchema,
          description: "Lista de libros publicados por el usuario"
        },
        401: Type.Object({ message: Type.String() }),
        404: Type.Object({ message: Type.String() }),
      },
    },
    preHandler: [fastify.authenticate],
    handler: async (request, reply) => {
      
      await request.jwtVerify();
            
      const user = request.user as UserType;

      const res = await query (
        `SELECT * FROM libros WHERE owner_id = $1`, [user.id]
      );
      if (res.rowCount === 0) {
        return reply.status(404).send({ message: "No hay ningún libro publicado por el usuario" });
      }
      const owned_books = res.rows;
      return owned_books;
      
    }
  });

  fastify.post('/publish', {
    schema: {
      tags: ['books'],
      summary: "Ruta para publicar un nuevo libro",
      description: "Permite al usuario publicar un libro y asociarlo a un genero",
      body: BookPostSchema,
      response: {
        201: {
          type: "object",
          properties: {
            message: { type: "string" },
            bookId: { type: "number" }
          }
        },
        404: {
          description: "Error al publicar libro",
          type: "object",
          properties: {
            message: { type: "string" }
          }
        }
      }
    },
    preHandler: [fastify.authenticate],
    handler: async function (request, reply) {
      try {
        await request.jwtVerify();

        const user = request.user as { id: number };
        const { name, description, author, genres, location } = request.body as BookPostType;

        // Validar que todos los campos requeridos estén presentes
        if (!name || !description || !location || !author || !genres?.length) {
          return reply.status(400).send({ message: "Todos los campos son obligatorios" });
        }
        
        const res = await query(
          `INSERT INTO books (name, description, author, owner_id, state) 
            VALUES ($1, $2, $3, $4, 'available') RETURNING id`,
          [name, description, author, user.id]
        );

        const bookId = res.rows[0].id;

        for (const genreId of genres) {
          await query(`INSERT INTO books_genres (id_book, id_genre) VALUES ($1,$2)`, [bookId, genreId]);
        }

        await query(
          `INSERT INTO publications (location, id_user, id_book) VALUES ($1,$2,$3)`,
          [location, user.id, bookId]
        );

        reply.code(201).send({
          message: 'Libro publicado correctamente',
          bookId: res.rows[0].id
        });
      } catch (error) {
        console.error("Error al publicar el libro:", error);
        reply.status(500).send({ message: "Error al publicar el libro" });
      }
    }
  })

  fastify.get('/genres', {
    schema: {
      tags: ['genres'],
      summary: 'Obtener todos los géneros',
      response: { 200: GenresResponseSchema }
    },
    handler: async () => {
      const res = await query('SELECT id, name FROM genres ORDER BY name');
      return res.rows;
    }
  });
};

export default bookRoutes