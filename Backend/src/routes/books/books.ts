import { FastifyPluginAsyncTypebox, Type } from '@fastify/type-provider-typebox';
import { query } from "../../services/database.js";
import { BookPostSchema, BookPostType, BookSchema } from '../../schemas/book/bookSchema.js';
import { UserType } from '../../schemas/user/userSchema.js';

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
          items: { $ref: 'BookSchema#' },
          description: "Lista de libros publicados"
        },
        404: Type.Object({ message: Type.String() }),
      }
    },
  handler: async (request, reply) => {
      const res = await query (
        `SELECT * FROM libros'`
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
          items: { $ref: 'BookSchema#' },
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
      summary: "Ruta para publicar un libro",
      description: "Permite al usuario publicar un libro",
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
    handler: async function (request, reply) {
      const bookPost = request.body as BookPostType;
      const name = bookPost.name;
      const description = bookPost.description;
      const author = bookPost.author;
      const genre = bookPost.genre;
      const location = bookPost.location;
      const image_url = bookPost.image_url;

      return [name, description, author, genre, location, image_url].forEach((field) => {
        if (!field || field.length === 0) {
          return reply.status(404).send({ message: "Todos los campos son obligatorios" });
        }
      });
      
      /*const res = await query(
        `INSERT INTO libros (name, description, author, genre, published_date, owner_id) 
          VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
        [name, description, author, genre, published_date, owner_id]
      );*/

      reply.code(201).send({
        message: 'Libro publicado correctamente',
        bookId: 0 //res.rows[0].id
      });
    }
  })
}

export default bookRoutes