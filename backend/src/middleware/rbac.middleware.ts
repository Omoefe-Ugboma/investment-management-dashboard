// src/middleware/rbac.middleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PERMISSIONS, ROLE_PERMISSIONS } from '../auth/rbac.constants';

export const checkPermission = (requiredPermission: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
      const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
        userId: string;
        email: string;
        roles: string[];
      };
      
      // Attach user to request
      req.user = {
        id: payload.userId,
        email: payload.email,
        roles: payload.roles
      };

      const userPermissions = payload.roles.flatMap(
        (role) => ROLE_PERMISSIONS[role] || []
      );

      if (!userPermissions.includes(requiredPermission)) {
        return res.status(403).json({ error: 'Forbidden' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ error: 'Invalid token' });
    }
  };
};