import fp from 'fastify-plugin'
import jwt, { FastifyJWTOptions } from '@fastify/jwt'
import { UCUError } from '../util/index.js';
import { FastifyRequest, FastifyReply } from 'fastify'
import { authenticateFunction } from '../types/fastify.js';
import { query } from '../services/database.js';

declare module 'fastify' {
  interface FastifyInstance {
    authenticate: (request: FastifyRequest, reply: FastifyReply) => Promise<void>
  }
}

const jwtOptions: FastifyJWTOptions = {
  secret: process.env.FASTIFY_SECRET || ''  //El or es porque no puede ser undefined
};

export default fp(async (fastify) => {
  //Recordar que string '' es falsy.
  if (!jwtOptions.secret) throw new UCUError("Falta setear el secret.");
  
  fastify.register(jwt, jwtOptions);

  const authenticate: authenticateFunction = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify()
    } catch (err) {
      reply.code(401).send({ error: "No autorizado" }) 
    }
  };

  fastify.decorate("authenticate", authenticate);

  const verifyAdmin: authenticateFunction = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      await request.jwtVerify();
      const { id } = request.user as { id: number };
      const { rows } = await query(`SELECT role FROM users WHERE id = ${id}`);
      const role = rows[0].role;
      if (role !== 'admin') {
        reply.code(401).send({ error: `Unauthorized, you must be an admin and you are ${role}` });
      }
    } catch (err) {
      reply.code(401).send({ error: 'Unauthorized' });
    }
  }

  fastify.decorate("verifyAdmin", verifyAdmin);


  const verifySelfOrAdmin: authenticateFunction = async (request: FastifyRequest, reply: FastifyReply) => {
    try{
      await request.jwtVerify();
      const { id: userId } = request.params as { id: string };
      const { id } = request.user as { id: number };
      const { rows } = await query(`SELECT role FROM users WHERE id = ${id}`);
      const role = rows[0].role;
      if (role === 'admin' || id === Number(userId)) {
        return;
      }
    } catch (err) {
      reply.code(401).send({error: 'Unauthorized'})
    }
  }

  fastify.decorate("verifySelfOrAdmin", verifySelfOrAdmin);


});
