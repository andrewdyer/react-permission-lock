import { createContext } from 'react';
import type * as React from 'react';

export interface PermissionContextProps {
  permissions: string[];
  hasPermission: (permission: string) => boolean;
}

const PermissionContext: React.Context<PermissionContextProps | undefined> =
  createContext<PermissionContextProps | undefined>(undefined);

export default PermissionContext;
