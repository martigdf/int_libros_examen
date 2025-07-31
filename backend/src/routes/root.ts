import { FastifyPluginAsyncTypebox } from '@fastify/type-provider-typebox'
import { WebSocket } from '@fastify/websocket'

const root: FastifyPluginAsyncTypebox = async (fastify, opts): Promise<void> => {

  fastify.register(async function () {

    fastify.route({

      method: 'GET',
      url: '/',
      handler: async (req, reply) => {

        return { root: true }

      },
      wsHandler: (socket: WebSocket, req) => {

        socket.send("Bienvenido cliente");
        fastify.websocketServer.clients.forEach( (cliente) => {
          cliente.send("Cantidad clientes: " + fastify.websocketServer.clients.size);
        });

        socket.on("message", chunk => {

          fastify.websocketServer.clients.forEach((cliente) => {

            if (cliente !== socket) {

              cliente.send(chunk.toString());

            }

          });

          console.log(chunk.toString());

        });

      }

    })

  })
}

export default root
