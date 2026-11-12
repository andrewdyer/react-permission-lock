import type * as React from 'react';

import { useHasPermission } from '../../hooks';

const withPermission =
  (
    requiredPermission: string,
    // The fallback is rendered without props; `any` keeps the published signature unchanged.
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    FallbackComponent: React.ComponentType<any> | null = null
  ) =>
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
