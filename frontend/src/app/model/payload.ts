export interface JWTPayload {
  user_id: string;
  user: string;
  role: number;
  exp?: number;
  iat?: number;
}