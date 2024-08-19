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

    test('should call onPermissionError when permission is not granted', () => {
        const TestComponent = () => {
            const context = React.useContext(PermissionContext);

            if (context && !context.hasPermission('write')) {
                return <div>No Write Permission</div>;
            }

            return <div>Has Write Permission</div>;
        };

        const onPermissionError = jest.fn();

        render(
            <PermissionProvider permissions={['read']} onPermissionError={onPermissionError}>
                <TestComponent />
            </PermissionProvider>
        );

        expect(onPermissionError).toHaveBeenCalledWith('write');
        expect(screen.getByText('No Write Permission')).toBeInTheDocument();
    });
});
