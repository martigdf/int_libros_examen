import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { RequestIdSchema, RequestPostSchema, RequestSchema } from '../../schemas/requests/requestSchema.js';
import { Type } from '@sinclair/typebox';
import { query } from '../../services/database.js';

const requestsRoutes: FastifyPluginAsyncTypebox = async (fastify, opts): Promise<void> => {

  fastify.post('/new', {
    schema: {
      tags: ['requests'],
      summary: 'Crear una nueva solicitud de préstamo',
      description: 'Permite al usuario crear una solicitud de préstamo para uno o más libros.',
      body: RequestPostSchema,
      response: {
        201: Type.Object({ message: Type.String(), requestId: Type.Number() }),
        400: Type.Object({ message: Type.String() })
      }
    },
    onRequest: [fastify.authenticate],
    handler: async (request, reply) => {
      const { receiver_user_id, books } = request.body;
      const sender = request.user as { id: number };
      try {
        // Usar WITH para insertar solicitud y luego insertar libros
        const insertRequest = await query(`
          WITH new_req AS (
            INSERT INTO requests (creation_date, state, sender_user_id, receiver_user_id)
            VALUES (CURRENT_TIMESTAMP, 'pending', $1, $2)
            RETURNING id
          )
          INSERT INTO requests_books (id_request, id_book)
          SELECT id, unnest($3::int[]) FROM new_req
          RETURNING id_request;
        `, [sender.id, receiver_user_id, books]);

        const requestId = insertRequest.rows[0].id_request;
        return reply.code(201).send({ message: 'Solicitud creada correctamente', requestId });

      } catch (err) {
        request.log.error(err);
        return reply.code(400).send({ message: 'Error al crear la solicitud' });
      }
    }
  });

  fastify.get('/sent', {
    schema: {
      tags: ['requests'],
      summary: 'Listar mis solicitudes',
      description: 'Devuelve una lista de solicitudes enviadas por el usuario autenticado.',
      response: { 200: Type.Array(RequestSchema) }
    },
    onRequest: [fastify.authenticate],
    handler: async (request, reply) => {
      const sender = request.user as { id: number };

      const { rows } = await query(`
        WITH req AS (
        SELECT r.*, u.name AS receiver_name
        FROM requests r
        JOIN users u ON u.id = r.receiver_user_id
        WHERE r.sender_user_id = $1
      )
      SELECT req.*, json_agg(b.name) AS books
      FROM req
      JOIN requests_books rb ON rb.id_request = req.id
      JOIN books b ON b.id = rb.id_book
      GROUP BY req.id, req.creation_date, req.state, req.sender_user_id, req.receiver_user_id, req.receiver_name
      ORDER BY req.creation_date DESC;
    `, [sender.id]);

      return rows;
    }
  });

  fastify.get('/received', {
    schema: {
      tags: ['requests'],
      summary: 'Listar solicitudes recibidas',
      description: 'Devuelve una lista de solicitudes recibidas para los libros publicados por el usuario autenticado.'
    },
    handler: async (request, reply) => {
      


    }
  });

  fastify.patch('/:id/response', {
    schema: {
      tags: ['requests'],
      summary: 'Ruta para responder a una solicitud',
      description: 'Acepta o rechaza una solicitud de préstamo usando su ID.',
      params: RequestIdSchema
    },
    handler: async (request, reply) => {

      console.log(request.params);
      console.log(request.body);

    }
  });

  fastify.patch('/:id/confirm-pickup', {
    schema: {
      tags: ['requests'],
      summary: 'Confirmar retiro',
      description: 'Confirma que el libro fue retirado por el solicitante.',
      params: RequestIdSchema
    },
    handler: async (request, reply) => {

      

    }
  });

  fastify.patch('/:id/confirm-return', {
    schema: {
      tags: ['requests'],
      summary: 'Confirmar devolución',
      description: 'Confirma que el libro fue devuelto por el solicitante.',
      params: RequestIdSchema
    },
    handler: async (request, reply) => {



    }
  });
  
};

export default requestsRoutes;