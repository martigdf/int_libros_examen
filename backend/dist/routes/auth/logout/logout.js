const authLogoutRoute = async (fastify, opts) => {
    fastify.post('/auth/logout', async (request, reply) => {
        return reply.send({ message: 'Logout successful' });
    });
};
export default authLogoutRoute;
//# sourceMappingURL=logout.js.map