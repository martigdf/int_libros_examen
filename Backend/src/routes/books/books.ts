import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
//import { query } from '../../services/database.js';

const bookRoutes: FastifyPluginAsyncTypebox = async (fastify, opts): Promise<void> => {

  fastify.get('/', {
    schema: {
      tags: ['books'],
      summary: "Ruta para listar todos los libros publicados",
      description: "Muestra todos los libros publicados"
    },
    handler: async (request, reply) => {
      
        return {  }
      
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
      }
    },
    handler: async (request, reply) => {
      
        return {  }
      
    }
  });

  fastify.get('/owned', {
    schema: {
      tags: ['books'],
      summary: "Ruta para mostrar todos los libros publicados por el usuario",
      description: "Muestra los libros que hayan sido publicados por el usuario",
    },
    handler: async (request, reply) => {
      
        return {  }
      
    }
  });

  fastify.post('/publish', {
    schema: {
      tags: ['books'],
      summary: "Ruta para publicar un libro",
      description: "Permite al usuario publicar un libro",
      body: {
        type: 'object',
        // required: [  ],
        properties: {  },
      },
    },
    handler: async (request, reply) => {
      
        return {  }
      
    }
  })
}

export default bookRoutes