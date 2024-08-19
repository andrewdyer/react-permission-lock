import React from 'react';
import PermissionContext from '../PermissionContext';

export interface PermissionProviderProps {
    children: React.ReactNode;
    permissions: string[];
}

const PermissionProvider: React.FC<PermissionProviderProps> = ({ children, permissions }) => {
    return (
        <PermissionContext.Provider value={{ permissions }}>{children}</PermissionContext.Provider>
    );
};

export default PermissionProvider;
