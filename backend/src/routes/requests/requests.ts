import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';
import { RequestIdSchema, RequestPostSchema } from '../../schemas/requests/requestSchema.js';

const requestsRoutes: FastifyPluginAsyncTypebox = async (fastify, opts): Promise<void> => {

  fastify.post('/new', {
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