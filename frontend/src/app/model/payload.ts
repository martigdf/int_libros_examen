export interface JWTPayload {
  user_id: string;
  name: string;
  lastname: string;
  username: string;
  email: string;
  user: string;
  role: 'admin' | 'user';
  exp?: number;
  iat?: number;
}