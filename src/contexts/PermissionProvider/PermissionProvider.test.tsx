import React from 'react';
import { render, screen } from '@testing-library/react';
import PermissionContext from '../PermissionContext';
import PermissionProvider from './PermissionProvider';

const TestComponent = () => {
    const context = React.useContext(PermissionContext);

    if (context && context?.permissions.length > 0) {
        return <div>{context.permissions.join(', ')}</div>;
    }

    return <div>No Context</div>;
};

describe('PermissionProvider', () => {
    test('should provide the correct context value', () => {
        render(
            <PermissionProvider permissions={['read', 'write']}>
                <TestComponent />
            </PermissionProvider>
        );

        expect(screen.getByText('read, write')).toBeInTheDocument();
    });

    test('should provide default value as undefined when no permissions are passed', () => {
        render(
            <PermissionProvider permissions={[]}>
                <TestComponent />
            </PermissionProvider>
        );

        expect(screen.getByText('No Context')).toBeInTheDocument();
    });
});
