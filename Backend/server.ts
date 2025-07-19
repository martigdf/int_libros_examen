// Read the .env file.
import * as dotenv from 'dotenv'

// Require the framework
import Fastify from 'fastify'

// Require library to exit fastify process, gracefully (if possible)
import closeWithGrace from 'close-with-grace'
dotenv.config()

// Instantiate Fastify with some config
const server = Fastify({
  logger: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss',
        ignore: 'pid,hostname'
      }
    },
    level: 'info'
  }
})

server.register(import('./src/app'))

closeWithGrace({ delay: parseInt(process.env.FASTIFY_CLOSE_GRACE_DELAY ?? '500') }, async function ({ signal, err, manual }) {
  if (err) {
    server.log.error(err)
  }
  await server.close()
} as closeWithGrace.CloseWithGraceAsyncCallback)

server.listen({ port: parseInt(process.env.PORT || '3000') }, (err: any) => {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
})

server.ready().then(() => {
  server.printRoutes()
})