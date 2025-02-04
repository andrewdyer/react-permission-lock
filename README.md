# React Permission Toolkit

A package for managing and enforcing permissions in React applications.

## Getting Started

To install this package use npm:

```bash
npm install react-permission-toolkit
```

## Usage

### Wrapping the React Application

To provide the necessary permissions context throughout the application, wrap the root component with `PermissionProvider`:

```tsx
// index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { PermissionProvider } from 'react-permission-toolkit';
import App from './App';

// Define the user's permissions
const permissions = ['read', 'write'];

// Optional: Define a callback function to handle permission errors
const onPermissionError = (permission: string) => {
    console.error(`Permission error: ${permission} is not granted.`);
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <PermissionProvider permissions={permissions} onPermissionError={onPermissionError}>
        <App />
    </PermissionProvider>,
    document.getElementById('root')
);
```

### Using the Higher-Order Component (HOC)

The `withPermission` HOC conditionally renders components based on user permissions:

```tsx
// App.tsx
import React from 'react';
import { withPermission } from 'react-permission-toolkit';

function SecretComponent() {
    return <div>Secret Information</div>;
}

function NoAccessComponent() {
    return <div>You do not have access to this information</div>;
}

const SecretComponentWithPermission = withPermission('read', NoAccessComponent)(SecretComponent);

function App() {
    return (
        <div>
            <h1>My Application</h1>
            <SecretComponentWithPermission />
        </div>
    );
}

export default App;
```

In this example, `SecretComponent` is only rendered if the user has the `read` permission. If the `read` permission is not granted, `NoAccessComponent` is displayed instead.

### Using the Hook

The `useHasPermission` hook checks for specific permissions within components:

```tsx
// App.tsx
import React from 'react';
import { useHasPermission } from 'react-permission-toolkit';

function PermissionBasedComponent() {
    const hasReadPermission = useHasPermission('read');

    return (
        <div>
            {hasReadPermission ? (
                <div>You have read permission</div>
            ) : (
                <div>You do not have read permission</div>
            )}
        </div>
    );
}

function App() {
    return (
        <div>
            <h1>My Application</h1>
            <PermissionBasedComponent />
        </div>
    );
}

export default App;
```

Here, `PermissionBasedComponent` uses the `useHasPermission` hook to check if the `read` permission is granted, rendering different content based on the result.

### Combining the HOC and Hook

For more complex scenarios, combine the `withPermission` HOC and `useHasPermission` hook. This allows wrapping a component with the HOC for initial permission checks, while still using the hook for further permission-based logic within the component:

```tsx
// App.tsx
import React from 'react';
import { useHasPermission, withPermission } from 'react-permission-toolkit';

function SecretComponent() {
    const hasWritePermission = useHasPermission('write');

    return (
        <div>
            <div>Secret Information</div>
            {hasWritePermission && <div>You have write access</div>}
        </div>
    );
}

function NoAccessComponent() {
    return <div>You do not have access to this information</div>;
}

const SecretComponentWithPermission = withPermission('read', NoAccessComponent)(SecretComponent);

function App() {
    return (
        <div>
            <h1>My Application</h1>
            <SecretComponentWithPermission />
        </div>
    );
}

export default App;
```

In this example, `SecretComponent` is first wrapped with `withPermission` to ensure the user has the `read` permission. Inside the component, the `useHasPermission` hook checks for the write permission to conditionally render additional content.
