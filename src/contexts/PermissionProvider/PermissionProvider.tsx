import React from 'react';
import PermissionContext from '../PermissionContext';

export interface PermissionProviderProps {
    children: React.ReactNode;
    permissions: string[];
    onPermissionError?: (permission: string) => void;
}

const PermissionProvider: React.FC<PermissionProviderProps> = ({
    children,
    permissions,
    onPermissionError
}) => {
    const hasPermission = React.useMemo(
        () => (permission: string) => {
            const hasPerm = permissions.indexOf(permission) !== -1;

            if (!hasPerm && onPermissionError) {
                onPermissionError(permission);
            }

            return hasPerm;
        },
        [permissions, onPermissionError]
    );

    return (
        <PermissionContext.Provider value={{ permissions, hasPermission }}>
            {children}
        </PermissionContext.Provider>
    );
};

export default PermissionProvider;
