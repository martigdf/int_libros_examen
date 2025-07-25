import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox';


const authLogoutRoute: FastifyPluginAsyncTypebox = async (fastify, opts): Promise<void> => {
    fastify.post('/auth/logout', async (request, reply) => {
        return reply.send({ message: 'Logout successful' });
    });
}

export default authLogoutRoute;