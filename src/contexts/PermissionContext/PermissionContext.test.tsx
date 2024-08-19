import React from 'react';
import { render, screen } from '@testing-library/react';
import PermissionContext from './PermissionContext';

const TestComponent = () => {
    const context = React.useContext(PermissionContext);

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
        render(
            <PermissionContext.Provider value={{ permissions: ['read', 'write'] }}>
                <TestComponent />
            </PermissionContext.Provider>
        );

        expect(screen.getByText('read, write')).toBeInTheDocument();
    });
});
