import React from 'react';
import PermissionContext from '../PermissionContext';

export interface PermissionProviderProps {
    children: React.ReactNode;
    permissions: string[];
}

const PermissionProvider: React.FC<PermissionProviderProps> = ({ children, permissions }) => {
    const hasPermission = React.useMemo(
        () => (permission: string) => permissions.indexOf(permission) !== -1,
        [permissions]
    );

    return (
        <PermissionContext.Provider value={{ permissions, hasPermission }}>
            {children}
        </PermissionContext.Provider>
    );
};

export default PermissionProvider;
