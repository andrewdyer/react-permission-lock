import React from 'react';
import { useHasPermission } from '../../hooks';

const withPermission =
    (requiredPermission: string, FallbackComponent: React.ComponentType<any> | null = null) =>
    <P extends object>(WrappedComponent: React.ComponentType<P>) => {
        return (props: P) => {
            const hasPermission = useHasPermission(requiredPermission);

            if (!hasPermission) {
                return FallbackComponent ? <FallbackComponent /> : null;
            }

            return <WrappedComponent {...props} />;
        };
    };

export default withPermission;
