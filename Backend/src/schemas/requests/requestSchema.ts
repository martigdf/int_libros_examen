import { Type } from '@sinclair/typebox';

// valido el body cuando se crea una solicitud
export const CreateRequestBodySchema = Type.Object({
  receiver_user_id: Type.String({ description: 'ID del propietario del libro(s)' }),
  books: Type.Array(
    Type.String({ description: 'Solicita ID del libro' }),
    { minItems: 1, description: 'Se solicita al menos un libro' }
  )
});

// Rutas request id
export const RequestParamsSchema = Type.Object({
  id: Type.String({ description: 'ID de la solicitud' })
});

// Estructura base para request
export const RequestBaseSchema = Type.Object({
  id_request: Type.String(),
  creation_date: Type.String({ format: 'date-time', description: 'Fecha de creación de la solicitud' }),
  status: Type.String({ description: 'Estado actual de la solicitud' }),
  requester_user_id: Type.String({ description: 'ID del usuario que solicita el préstamo' }),
  receiver_user_id: Type.String({ description: 'ID del usuario dueño del libro' })
});