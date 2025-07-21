import { Static, Type } from '@sinclair/typebox';

export const BookIdSchema = Type.Object({
    id: Type.Number(),
}, { $id: 'BookIdSchema' });

export const GenreSchema = Type.Object({
    id: Type.Number(),
    name: Type.String({ minLength: 2, maxLength: 30 }),
});

export const BookSchema = Type.Object({
    id: Type.Number(),
    name: Type.String({ minLength: 2, maxLength: 50 }),
    description: Type.String({ minLength: 10, maxLength: 500 }),
    author: Type.String({ minLength: 2, maxLength: 50 }),
    genre: Type.Array(
        Type.Ref(GenreSchema),
        { minItems: 1, description: 'Lista de géneros del libro' }
    ),
    date_published: Type.String({ format: 'date', description: 'Fecha de publicación del libro' }),
    location: Type.String({ minLength: 5, maxLength: 100 }),
    status: Type.Union([
        Type.Literal("open"),
        Type.Literal("closed")
    ]),
    owner_id: Type.Number({ description: 'ID del propietario del libro' }),
    image_url: Type.Optional(Type.String({ format: 'uri', description: 'URL de la imagen del libro' })),
});

export const BookPostSchema = Type.Object({
    name: Type.String({ minLength: 2, maxLength: 50 }),
    description: Type.String({ minLength: 10, maxLength: 500 }),
    author: Type.String({ minLength: 2, maxLength: 50 }),
    genre: Type.Array(
        Type.Ref(GenreSchema),
        { minItems: 1, description: 'Lista de géneros del libro' }
    ),
    location: Type.String({ minLength: 5, maxLength: 100 }),
    image_url: Type.Optional(Type.String({ format: 'uri', description: 'URL de la imagen del libro' })),
});

export const BookIdReference = Type.Ref(BookIdSchema);
export type BookIdRef = Static<typeof BookIdReference>;
export type BookIdType = Static<typeof BookIdSchema>;
export type BookType = Static<typeof BookSchema>;
export type BookPostType = Static<typeof BookPostSchema>;