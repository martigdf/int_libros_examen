import { FastifyPluginAsyncTypebox, Type } from '@fastify/type-provider-typebox';
import { query } from "../../services/database.js";
import { UserIdSchema, UserSchema, UserPostType, UserPostSchema } from '../../schemas/user/userSchema.js';
import bcrypt from 'bcryptjs';

const usersRoute: FastifyPluginAsyncTypebox = async (fastify, opts): Promise<void> => {
  fastify.get('/:id',  {
    schema: {
        tags: ['users'],
        summary: 'Ruta para obtener un usuario por ID',
        params: UserIdSchema,
        response: {
            200: UserSchema,
            404: Type.Object({message: Type.String()}),
        }
    },
    handler: async function (request, reply){
        const {id} = request.params as { id: number };
        const res = await query (
            `SELECT * FROM users WHERE id = $1`,
            [id]
        );
        if (res.rowCount === 0) {
            return reply.status(404).send({ message: "Usuario no encontrado" });
        }
        const user = res.rows[0];
        return user;

    }
  });

  fastify.post('/register', {
    schema: {
      tags: ['users'],
      summary: 'Ruta para registrar un usuario',
      description: "Permite a un usuario registrarse",
      body: UserPostSchema,
      response: {
        201: {
          type: "object",
          properties: {
            message: { type: "string" },
            userId: { type: "number" }
          }
        },
        404: {
          description: "Error al registrar usuario",
          type: "object",
          properties: {
            message: { type: "string" }
          }
        }
      }
    },
    handler: async function (request, reply) {
        const userPost = request.body as UserPostType;
        const name = userPost.name;
        const lastname = userPost.lastname;
        const username = userPost.username;
        const email = userPost.email;
        const password = userPost.password;
        const role = userPost.role;
        const hashedPassword = await bcrypt.hash(password, 10);

        const res = await query(
          `INSERT INTO users (name, lastname, username, email, password, role) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
          [name, lastname, username, email, hashedPassword, role]
        );
        reply.code(201).send({
          message: 'Usuario registrado correctamente',
          userId: res.rows[0].id
        });
    }
  });
}

export default usersRoute;