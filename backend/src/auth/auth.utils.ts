import jwt from 'jsonwebtoken';
import { User } from '../models/user.entity';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';
const REFRESH_SECRET = process.env.REFRESH_SECRET || 'refresh-secret-key';

export const generateTokens = (user: User) => {
  const accessToken = jwt.sign(
    { userId: user.id, email: user.email, roles: user.roles },
    JWT_SECRET,
    { expiresIn: '15m' }
  );

  const refreshToken = jwt.sign(
    { userId: user.id },
    REFRESH_SECRET,
    { expiresIn: '7d' }
  );

  return { accessToken, refreshToken };
};

export const verifyToken = (token: string, isRefresh = false) => {
  return jwt.verify(token, isRefresh ? REFRESH_SECRET : JWT_SECRET);
};