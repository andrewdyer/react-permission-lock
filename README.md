# React Permission Toolkit

A template for creating React packages.

## Getting Started

To install this package use npm:

```bash
npm install react-permission-toolkit
```

## Usage

### Wrap Your React App

First, wrap your application with the `PermissionProvider` to provide the necessary permissions context:

```tsx
// index.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { PermissionProvider } from 'react-permission-toolkit';
import App from './App';

const permissions = ['read', 'write']; // Define your permissions here

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <PermissionProvider permissions={permissions}>
        <App />
    </PermissionProvider>,
    document.getElementById('root')
);
```

### Use the HOC

The `withPermission` higher-order component (HOC) allows you to conditionally render components based on user permissions:

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

In this example, `SecretComponent` will only be rendered if the user has the `read` permission. If the user does not have the `read` permission, the `NoAccessComponent` will be rendered instead.

### Use the Hook

The `useHasPermission` hook allows you to check for specific permissions within your components:

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

In this example, `PermissionBasedComponent` uses the `useHasPermission` hook to check if the user has the `read` permission and conditionally renders content based on the result.

### Combining Both Methods

To combine both the Higher-Order Component (HOC) `withPermission` and the `useHasPermission` hook, you can use the HOC to wrap a component and then use the hook within that component to check for additional permissions or perform other permission-related logic.

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

In this example, the `SecretComponent` is wrapped with the `withPermission` HOC to check for the `read` permission. Inside that component, the `useHasPermission` hook is used to check for the `write` permission and conditionally render additional content.

## Local Development

For local development, use Yalc to install this package in your project.

Yalc is a tool for managing local development of npm packages. It allows you to work on this package locally and test it in other projects without publishing to the npm registry.

To use yalc, you need to install it globally on your machine. You can do this using npm:

```bash
npm install yalc -g
```

### Installing the Package with Yalc

First, navigate to the project directory where you want to use this package and run:

```bash
yalc add react-permission-toolkit
```

This will install the package from the local Yalc store. You can now use it in the project as you would with any other npm package.

### Updating the Package with Yalc

After publishing changes to this package to the local Yalc store, navigate to the project directory and run:

```bash
yalc update react-permission-toolkit
```

This will update the installed version of this package in the project.

## Available Scripts

In the project directory, you can run:

### `npm run build`

Builds production files in your `dist/` folder. It generates CommonJS, ES Modules, as well as TypeScript declaration files.

### `npm run build:cjs`

Builds CommonJS (CJS) modules for the project.

### `npm run build:esm`

Builds ES Modules (ESM) for the project.

### `npm run build:types`

Generates TypeScript declaration files.

### `npm run clean`

Removes the `dist/` folder to ensure a clean build.

### `npm run format`

Formats the code using Prettier according to the rules defined in package.json.

### `npm run test`

Runs the test suite for the project using Jest.

### `npm run test:watch`

Runs the test suite in watch mode, re-running tests when files change.

### `npm run test:coverage`

Runs the test suite and generates a coverage report.

### `npm run yalc:publish`

Publishes the package to the local Yalc store for local development.

### `npm run yalc:push`

Publishes updates to the package in the local Yalc store and pushes the changes to linked projects.

## Publishing

This repository is configured to publish the package to npm, every time you publish a new release, using GitHub Actions.

### Creating and Using an npm Token

To publish the package, you need an npm token:

1. Log in to your npm account.
2. Navigate to Access Tokens in your npm account settings.
3. Generate a new token with the Automation option, especially if you have 2FA enabled.
4. Add the token to your GitHub repository secrets:
    - Go to Settings > Secrets and variables > Actions.
    - Add a new secret named `NPM_TOKEN` and paste your npm token.
