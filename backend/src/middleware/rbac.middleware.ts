// src/middleware/rbac.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PERMISSIONS, ROLE_PERMISSIONS } from '../auth/rbac.constants';
import { Permission } from '../auth/rbac.types';

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        roles: string[];
        permissions?: Permission[];
      };
    }
  }
}

export const checkPermission = (requiredPermission: Permission) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Missing or invalid authorization header' });
    }

    const token = authHeader.split(' ')[1];
    
    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: string;
        email: string;
        roles: string[];
        permissions?: Permission[];
      };

      req.user = {
        id: payload.userId,
        email: payload.email,
        roles: payload.roles,
        permissions: payload.permissions,
      };

      const userPermissions = [
        ...(payload.permissions || []),
        ...payload.roles.flatMap(role => ROLE_PERMISSIONS[role] || [])
      ];

      if (!userPermissions.includes(requiredPermission)) {
        return res.status(403).json({ 
          error: 'Forbidden',
          requiredPermission,
          userPermissions 
        });
      }

      next();
    } catch (error) {
      if (error instanceof jwt.TokenExpiredError) {
        return res.status(401).json({ error: 'Token expired' });
      }
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
};