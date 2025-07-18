import { FastifyInstance, FastifyPluginAsync, FastifyPluginOptions } from 'fastify';

const usersRoutes: FastifyPluginAsync = async (
  fastify: FastifyInstance,
  opts: FastifyPluginOptions
): Promise<void> => {
    const usuarios = [
        { id: 1, name: "Martina", lastname: "Guzmán", email: "martina@example.com", role: "user", registration_date: "2025-07-01" },
        { id: 2, name: "Nicolás", lastname: "Márquez", email: "nicolas@example.com", role: "admin", registration_date: "2025-07-02" }
    ];
    
    fastify.get('/:id', {
    schema: {
        tags: ['users'],
        summary: "Ruta para obtener usuario por ID",

    },
    handler: async function (request, reply) {
        const { id } = request.params as { id: string };
        const user = usuarios.find(u => u.id === Number(id));
        
        if (!user) {
        reply.code(404).send({ message: "Usuario no encontrado" });
        return;
        }

        return user;
    }
    });

}
export default usersRoutes;