export interface JwtPayload {
  userId: string;  // Can keep this as userId
  email: string;
  roles: string[];
}