import fp from 'fastify-plugin'
import jwt, { FastifyJWTOptions } from '@fastify/jwt'
import { UCUError } from '../util/index.js';

const jwtOptions: FastifyJWTOptions = {
  secret: process.env.FASTIFY_SECRET || ''  //El or es porque no puede ser undefined
};

export default fp<FastifyJWTOptions>(async (fastify) => {
  //Recordar que string '' es falsy.
  if (!jwtOptions.secret) throw new UCUError("Falta setear el secret.");
  fastify.register(jwt,jwtOptions)
});
