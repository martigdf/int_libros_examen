export interface JWTPayload {
  user_id: string;
  name: string;
  last_name: string;
  username: string;
  email: string;
  user: string;
  role: 'admin' | 'user';
  exp?: number;
  iat?: number;
}