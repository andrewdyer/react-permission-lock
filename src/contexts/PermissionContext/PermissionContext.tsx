import { createContext } from 'react';

export interface PermissionContextProps {
  permissions: string[];
  hasPermission: (permission: string) => boolean;
}

const PermissionContext = createContext<PermissionContextProps | undefined>(
  undefined
);

export default PermissionContext;
