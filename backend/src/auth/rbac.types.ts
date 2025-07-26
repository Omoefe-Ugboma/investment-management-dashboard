// src/auth/rbac.types.ts
export type Permission =
  | 'user:create'
  | 'user:read'
  | 'user:update'
  | 'user:delete'
  | 'investment:create'
  | 'investment:read'
  | 'investment:update'
  | 'investment:delete'
  | 'portfolio:view';

export type Role = 'admin' | 'manager' | 'user' | 'guest';

export interface RolePermissions {
  [role: string]: Permission[];
}