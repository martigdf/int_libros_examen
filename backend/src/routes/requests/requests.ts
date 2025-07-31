import { FastifyPluginAsyncTypebox, Type } from '@fastify/type-provider-typebox';
import { RequestIdSchema, RequestPostSchema } from '../../schemas/requests/requestSchema.js';
import { query } from '../../services/database.js';

const requestsRoutes: FastifyPluginAsyncTypebox = async (fastify, opts): Promise<void> => {

  fastify.post('/', {
    schema: {
      tags: ['requests'],
      summary: 'Crear una nueva solicitud de préstamo',
      description: 'Permite al usuario crear una solicitud de préstamo para uno o más libros.',
      body: RequestPostSchema
    },
    handler: async (request, reply) => {
      
      

    }
  });

  fastify.get('/sent', {
    schema: {
      tags: ['requests'],
      summary: 'Listar mis solicitudes',
      description: 'Devuelve una lista de solicitudes enviadas por el usuario autenticado.'
    },
    handler: async (request, reply) => {



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
      params: RequestIdSchema,
      security: [
        { bearerAuth: [] }
      ],
      response: {

        200: Type.Object({ message: Type.String()}),
        403: Type.Object({ message: Type.String()})

      }
    },
    handler: async (request, reply) => {

      await request.jwtVerify();

      const { id: userId } = request.user as { id: number };

      const { id: requestId } = request.params as { id: number };

      const userRequests = await query(
        
        `SELECT * FROM requests WHERE id = $1 AND receiver_user_id = $2`,
        [requestId, userId]

      )

      if (userRequests.rowCount === 0) {
        
        return reply.status(403).send({ message: "No tienes permiso para modificar esta solicitud" });
      
      }
      
      await query(
        `INSERT INTO loans (request_id) 
          VALUES ($1)`,
        [requestId]
      );

      return reply.status(200).send({ message: "Prestamo confirmado correctamente" })

    }
  });

  fastify.patch('/:id/confirm-return', {
    schema: {
      tags: ['requests'],
      summary: 'Confirmar devolución',
      description: 'Confirma que el libro fue devuelto por el solicitante.',
      params: RequestIdSchema,
      security: [
        { bearerAuth: [] }
      ],
      response: {

        200: Type.Object({ message: Type.String()}),
        403: Type.Object({ message: Type.String()})

      }
    },
    handler: async (request, reply) => {

      await request.jwtVerify();

      const { id: userId } = request.user as { id: number };

      const { id: requestId } = request.params as { id: number };

      const userRequests = await query(
        
        `SELECT * FROM loans WHERE request_id = $1 AND receiver_user_id = $2`,
        [requestId, userId]

      )

      if (userRequests.rowCount === 0) {
        
        return reply.status(403).send({ message: "No tienes permiso para modificar esta solicitud" });
      
      }
      
      await query(
        `INSERT INTO returns (request_id, opinion, calification) 
          VALUES ($1, $2, $3)`,
        [requestId, '', 1]
      )

      return reply.status(200).send({ message: "Devolución confirmada correctamente" })

    }
  });
  
};

export default requestsRoutes;