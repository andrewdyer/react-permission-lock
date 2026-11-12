import { renderHook } from '@testing-library/react';
import type { ReactNode } from 'react';

import useHasPermission from './useHasPermission';
import { PermissionProvider } from '../../contexts';

describe('useHasPermission', () => {
  test('should return true if the required permission is present', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <PermissionProvider permissions={['read', 'write']}>
        {children}
      </PermissionProvider>
    );

    const { result } = renderHook(() => useHasPermission('read'), { wrapper });

    expect(result.current).toBe(true);
  });

  test('should return false if the required permission is not present', () => {
    const wrapper = ({ children }: { children: ReactNode }) => (
      <PermissionProvider permissions={['read', 'write']}>
        {children}
      </PermissionProvider>
    );

    const { result } = renderHook(() => useHasPermission('delete'), {
      wrapper,
    });

    expect(result.current).toBe(false);
  });

  test('should throw an error if used outside of PermissionProvider', () => {
    let error;

    try {
      renderHook(() => useHasPermission('read'));
    } catch (e) {
      error = e;
    }

    expect(error).toEqual(
      new Error('useHasPermission must be used within a PermissionProvider')
    );
  });
});
