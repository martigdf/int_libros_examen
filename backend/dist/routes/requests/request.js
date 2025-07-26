import { RequestParamsSchema, CreateRequestBodySchema } from '../../schemas/requests/requestSchema.js';
const requestsRoutes = async (fastify, opts) => {
    const requests = [
        {
            id_request: '1',
            creation_date: '2025-07-15T10:00:00Z',
            status: 'pendiente',
            requester_user_id: '3',
            receiver_user_id: '1'
        },
        {
            id_request: '2',
            creation_date: '2025-07-16T11:30:00Z',
            status: 'aceptada',
            requester_user_id: '4',
            receiver_user_id: '2'
        }
    ];
    fastify.post('/', {
        schema: {
            tags: ['requests'],
            summary: 'Crear una nueva solicitud de préstamo',
            description: 'Permite al usuario crear una solicitud de préstamo para uno o más libros.',
            body: CreateRequestBodySchema
        },
        handler: async (request, reply) => { }
    });
    fastify.get('/sent', {
        schema: {
            tags: ['requests'],
            summary: 'Listar mis solicitudes',
            description: 'Devuelve una lista de solicitudes enviadas por el usuario autenticado.'
        },
        handler: async (request, reply) => {
            reply.send(requests);
        }
    });
    fastify.get('/received', {
        schema: {
            tags: ['requests'],
            summary: 'Listar solicitudes recibidas',
            description: 'Devuelve una lista de solicitudes recibidas para los libros publicados por el usuario autenticado.'
        },
        handler: async (request, reply) => {
            reply.send(requests);
        }
    });
    fastify.patch('/:id/accept', {
        schema: {
            tags: ['requests'],
            summary: 'Aceptar una solicitud',
            description: 'Acepta una solicitud de préstamo usando su ID.',
            params: RequestParamsSchema
        },
        handler: async (request, reply) => {
            const { id } = request.params;
            const reqFound = requests.find(r => r.id_request === id);
            reply.send(reqFound || { message: 'Solicitud no encontrada' });
        }
    });
    fastify.patch('/:id/reject', {
        schema: {
            tags: ['requests'],
            summary: 'Rechazar una solicitud',
            description: 'Rechaza una solicitud de préstamo usando su ID.',
            params: RequestParamsSchema
        },
        handler: async (request, reply) => {
            const { id } = request.params;
            const reqFound = requests.find(r => r.id_request === id);
            reply.send(reqFound || { message: 'Solicitud no encontrada' });
        }
    });
    fastify.patch('/:id/confirm-pickup', {
        schema: {
            tags: ['requests'],
            summary: 'Confirmar retiro',
            description: 'Confirma que el libro fue retirado por el solicitante.',
            params: RequestParamsSchema
        },
        handler: async (request, reply) => { }
    });
    fastify.patch('/:id/confirm-return', {
        schema: {
            tags: ['requests'],
            summary: 'Confirmar devolución',
            description: 'Confirma que el libro fue devuelto por el solicitante.',
            params: RequestParamsSchema
        },
        handler: async (request, reply) => { }
    });
    fastify.patch('/:id/cancel-no-pickup', {
        schema: {
            tags: ['requests'],
            summary: 'Cancelar solicitud por no retiro',
            description: 'Cancela la solicitud si el libro no fue retirado por el solicitante.',
            params: RequestParamsSchema
        },
        handler: async (request, reply) => { }
    });
};
export default requestsRoutes;
//# sourceMappingURL=request.js.map