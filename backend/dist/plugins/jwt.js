import fp from 'fastify-plugin';
import jwt from '@fastify/jwt';
import { UCUError } from '../util/index.js';
const jwtOptions = {
    secret: process.env.FASTIFY_SECRET || ''
};
export default fp(async (fastify) => {
    if (!jwtOptions.secret)
        throw new UCUError("Falta setear el secret.");
    fastify.register(jwt, jwtOptions);
    fastify.decorate("authenticate", async function (request, reply) {
        try {
            await request.jwtVerify();
        }
        catch (err) {
            reply.code(401).send({ error: "No autorizado" });
        }
    });
});
//# sourceMappingURL=jwt.js.map