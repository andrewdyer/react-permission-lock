import React from 'react';

export interface PermissionContextProps {
    permissions: string[];
}

const PermissionContext = React.createContext<PermissionContextProps | undefined>(undefined);

export default PermissionContext;
