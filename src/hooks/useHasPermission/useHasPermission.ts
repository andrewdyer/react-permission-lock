import { useContext } from 'react';
import { PermissionContext } from '../../contexts';

const useHasPermission = (requiredPermission: string): boolean => {
    const permissionContext = useContext(PermissionContext);

    if (!permissionContext) {
        throw new Error('useHasPermission must be used within a PermissionProvider');
    }

    const { permissions } = permissionContext;

    const hasPermission = permissions.indexOf(requiredPermission) !== -1;

    return hasPermission;
};

export default useHasPermission;
