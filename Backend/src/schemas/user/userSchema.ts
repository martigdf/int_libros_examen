import { Type } from '@sinclair/typebox';

export const UserSchema = Type.Object({
  id: Type.Number(),
  name: Type.String(),
  lastname: Type.String(),
  name_user: Type.String(),
  email: Type.String({ format: 'email' }),
  role: Type.String(),
});
