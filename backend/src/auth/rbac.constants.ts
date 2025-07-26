// src/auth/rbac.constants.ts
import { Permission, RolePermissions } from './rbac.types';

export const PERMISSIONS = {
  USER_CREATE: 'user:create' as const,
  USER_READ: 'user:read' as const,
  USER_UPDATE: 'user:update' as const,
  USER_DELETE: 'user:delete' as const,
  INVESTMENT_CREATE: 'investment:create' as const,
  INVESTMENT_READ: 'investment:read' as const,
  INVESTMENT_UPDATE: 'investment:update' as const,
  INVESTMENT_DELETE: 'investment:delete' as const,
  PORTFOLIO_VIEW: 'portfolio:view' as const,
};

export const ROLES = {
  ADMIN: 'admin' as const,
  MANAGER: 'manager' as const,
  USER: 'user' as const,
  GUEST: 'guest' as const,
};

export const ROLE_PERMISSIONS: RolePermissions = {
  [ROLES.ADMIN]: [
    PERMISSIONS.USER_CREATE,
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_UPDATE,
    PERMISSIONS.USER_DELETE,
    PERMISSIONS.INVESTMENT_CREATE,
    PERMISSIONS.INVESTMENT_READ,
    PERMISSIONS.INVESTMENT_UPDATE,
    PERMISSIONS.INVESTMENT_DELETE,
    PERMISSIONS.PORTFOLIO_VIEW,
  ],
  [ROLES.MANAGER]: [
    PERMISSIONS.USER_READ,
    PERMISSIONS.INVESTMENT_CREATE,
    PERMISSIONS.INVESTMENT_READ,
    PERMISSIONS.INVESTMENT_UPDATE,
    PERMISSIONS.PORTFOLIO_VIEW,
  ],
  [ROLES.USER]: [
    PERMISSIONS.INVESTMENT_READ,
    PERMISSIONS.PORTFOLIO_VIEW,
  ],
  [ROLES.GUEST]: [
    PERMISSIONS.INVESTMENT_READ,
  ],
};