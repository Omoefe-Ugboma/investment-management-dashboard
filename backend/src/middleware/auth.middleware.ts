import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayload } from '../types/jwt';
import { Permission } from '../auth/rbac.types';

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;  // Changed from userId to match your interface
        email: string;
        roles: string[];
        permissions?: Permission[];
      };
    }
  }
}

export const authenticateJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  
  if (!authHeader) {
    return res.sendStatus(401);
  }

  const token = authHeader.split(' ')[1];
  
  jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key', (err, payload) => {
    if (err) {
      return res.sendStatus(403);
    }

    // Type guard
    if (typeof payload === 'string' || !payload) {
      return res.sendStatus(403);
    }

    const userPayload = payload as JwtPayload;
    
    // Assign with consistent property names
    req.user = {
      id: userPayload.userId,  // Changed to 'id' to match your interface
      email: userPayload.email,
      roles: userPayload.roles
    };
    
    next();
  });
};