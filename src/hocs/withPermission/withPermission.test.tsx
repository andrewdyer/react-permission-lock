import React from 'react';
import { render, screen } from '@testing-library/react';
import { PermissionProvider } from '../../contexts';
import withPermission from './withPermission';

const TestComponent: React.FC = () => <div>Mock Component Content</div>;

const FallbackComponent: React.FC = () => <div>No Access</div>;

const WrappedComponent = withPermission('VIEW_DASHBOARD', FallbackComponent)(TestComponent);

describe('withPermission', () => {
    test('should render the wrapped component when the user has the required permission', () => {
        render(
            <PermissionProvider permissions={['VIEW_DASHBOARD']}>
                <WrappedComponent />
            </PermissionProvider>
        );

        expect(screen.getByText('Mock Component Content')).toBeInTheDocument();
    });

    test('should throw an error if used outside of a PermissionProvider', () => {
        expect(() => render(<WrappedComponent />)).toThrow(
            'useHasPermission must be used within a PermissionProvider'
        );
    });

    test('should render the fallback component when the user does not have the required permission', () => {
        render(
            <PermissionProvider permissions={['EDIT_PROFILE']}>
                <WrappedComponent />
            </PermissionProvider>
        );

        expect(screen.getByText('No Access')).toBeInTheDocument();
    });

    test('should render nothing when there is no fallback component and the user lacks the required permission', () => {
        const WrappedComponentWithoutFallback = withPermission('VIEW_DASHBOARD')(TestComponent);

        const { container } = render(
            <PermissionProvider permissions={['EDIT_PROFILE']}>
                <WrappedComponentWithoutFallback />
            </PermissionProvider>
        );

        expect(container).toBeEmptyDOMElement();
    });

    test('should throw an error if used outside of a PermissionProvider', () => {
        expect(() => render(<WrappedComponent />)).toThrow(
            'useHasPermission must be used within a PermissionProvider'
        );
    });
});
