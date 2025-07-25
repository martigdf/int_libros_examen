import fp from 'fastify-plugin'
import jwt, { FastifyJWTOptions } from '@fastify/jwt'
import { UCUError } from '../util/index.js';
declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>
  }
}

const jwtOptions: FastifyJWTOptions = {
  secret: process.env.FASTIFY_SECRET || ''  //El or es porque no puede ser undefined
};

export default fp<FastifyJWTOptions>(async (fastify) => {
  //Recordar que string '' es falsy.
  if (!jwtOptions.secret) throw new UCUError("Falta setear el secret.");
  
  fastify.register(jwt, jwtOptions);

  fastify.decorate("authenticate", async function (request: any, reply: any) {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.code(401).send({ error: "No autorizado" }) 
    }
  })
});
