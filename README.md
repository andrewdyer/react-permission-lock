![React Permission Lock](https://raw.githubusercontent.com/andrewdyer/public-assets/refs/heads/main/images/covers/react-permission-lock.png)

# 🔒 React Permission Lock

A package for managing and enforcing permissions in React applications.

## 📄 License

Licensed under the [MIT license](https://opensource.org/licenses/MIT) and is free for private or commercial projects.

## ✨ Introduction

React Permission Lock is a lightweight and easy-to-use library for managing permissions in your React applications. It allows you to control access to different parts of your application based on defined permissions, making it easier to enforce security and manage roles.

## 📥 Installation

To install this package use npm:

```bash
npm install react-permission-lock
```

Or with Yarn:

```bash
yarn add react-permission-lock
```

## 🚀 Getting Started

To provide the necessary permissions context throughout the application, wrap the root component with `PermissionProvider`:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { PermissionProvider } from 'react-permission-lock';
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
## 📖 Usage

### Using the Higher-Order Component (HOC)

The `withPermission` HOC conditionally renders components based on user permissions:

```tsx
import React from 'react';
import { withPermission } from 'react-permission-lock';

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
import React from 'react';
import { useHasPermission } from 'react-permission-lock';

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
import React from 'react';
import { useHasPermission, withPermission } from 'react-permission-lock';

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
