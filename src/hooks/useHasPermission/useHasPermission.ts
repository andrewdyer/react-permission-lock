import { useContext } from 'react';
import { PermissionContext } from '../../contexts';

const useHasPermission = (permission: string): boolean => {
    const permissionContext = useContext(PermissionContext);

    if (!permissionContext) {
        throw new Error('useHasPermission must be used within a PermissionProvider');
    }

    return permissionContext.hasPermission(permission);
};

export default useHasPermission;
