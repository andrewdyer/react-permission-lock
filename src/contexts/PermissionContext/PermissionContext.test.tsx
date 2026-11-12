import { render, screen } from '@testing-library/react';
import { useContext } from 'react';

import PermissionContext from './PermissionContext';

const TestComponent = () => {
  const context = useContext(PermissionContext);

  return <div>{context ? context.permissions.join(', ') : 'No Context'}</div>;
};

describe('PermissionContext', () => {
  test('should provide default value as undefined', () => {
    render(
      <PermissionContext.Provider value={undefined}>
        <TestComponent />
      </PermissionContext.Provider>
    );

    expect(screen.getByText('No Context')).toBeInTheDocument();
  });

  test('should provide the correct context value', () => {
    const hasPermission = vi.fn();

    render(
      <PermissionContext.Provider
        value={{ permissions: ['read', 'write'], hasPermission }}
      >
        <TestComponent />
      </PermissionContext.Provider>
    );

    expect(screen.getByText('read, write')).toBeInTheDocument();
  });
});
