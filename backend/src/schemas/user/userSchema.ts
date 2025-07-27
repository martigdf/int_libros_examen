import { Static, Type } from '@sinclair/typebox';

export const UserIdSchema = Type.Object({
    id: Type.Number(),
}, { $id: 'UserIdSchema' });

export const UserSchema = Type.Object({
  id: Type.Number(),
  name: Type.String({ minLength: 2, maxLength: 50 }),
  lastname: Type.String({ minLength: 2, maxLength: 50 }),
  username: Type.String({ minLength: 2, maxLength: 50 }),
  email: Type.String({ type: 'string', format: 'email' }),
  role: Type.Union([Type.Literal("admin"), Type.Literal("user")]),
});

export const UserPostSchema = Type.Object({
  name: Type.String(),
  lastname: Type.String(),
  username: Type.String(),
  email: Type.String({format: 'email'}),
  password: Type.String({ minLength: 6, maxLength: 100 }),
  role:Type.Union([Type.Literal("admin"), Type.Literal("user")]),
});

export const UserPutSchema = Type.Partial(Type.Object({
  name: Type.Optional(Type.String()),
  lastname: Type.Optional(Type.String()),
  username: Type.Optional(Type.String()),
  email: Type.Optional(Type.String({ format: 'email' })),
  password: Type.Optional(Type.String()),
  role: Type.Optional(Type.Union([Type.Literal("admin"), Type.Literal("user")]))
}), { $id: 'UserPutSchema' });

export const UserIdReference = Type.Ref(UserIdSchema);
export type UserIdRef = Static<typeof UserIdReference>;
export type UserIdType = Static<typeof UserIdSchema>;
export type UserType = Static<typeof UserSchema>;
export type UserPostType = Static<typeof UserPostSchema>;
export type UserPutType = Static<typeof UserPutSchema>;
