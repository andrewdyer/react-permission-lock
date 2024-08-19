import React from 'react';

export interface PermissionContextProps {
    permissions: string[];
    hasPermission: (permission: string) => boolean;
}

const PermissionContext = React.createContext<PermissionContextProps | undefined>(undefined);

export default PermissionContext;
