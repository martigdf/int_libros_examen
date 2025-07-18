import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import { query } from '../../../services/database.js';

const adminRoute: FastifyPluginAsyncTypebox = async (fastify, opts): Promise<void> => {
    fastify.get('/admin', {
        schema: 
        tags: ['admin'],
        summary: "Protected base route for the administrator panel",
        description: "Redirects to the administrator panel",
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

export default adminRoute