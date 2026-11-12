# React Permission Lock

A permissions library for React applications that gates components and checks access via a provider, hook and higher-order component.

## Introduction

This library stores the granted permissions as a list of names in a React context supplied by a provider. Each check tests whether a permission is present in that list, and an optional callback is invoked whenever a check fails. Components query access through a hook, which throws when used outside the provider, or are wrapped in a higher-order component that renders a fallback component, or nothing, when the required permission is missing.

## Prerequisites

- **[React](https://react.dev/)**: Version 19.2 or later, together with React DOM, installed as peer dependencies.
- **[Node.js](https://nodejs.org/)**: Version 24.19.0 or later, as specified by the package `engines` field.

## Installation

```bash
npm install react-permission-lock
```

```bash
yarn add react-permission-lock
```

```bash
pnpm add react-permission-lock
```

## Getting Started

Wrap the application in a permission provider.

1. Obtain the current user's permissions as an array of strings:

   ```ts
   const permissions = ['read', 'write'];
   ```

2. Render `PermissionProvider` at the root of the application, passing the permissions and, optionally, a callback for failed checks:

   ```tsx
   import { createRoot } from 'react-dom/client';
   import { PermissionProvider } from 'react-permission-lock';

   import App from './App';

   createRoot(document.getElementById('root')!).render(
     <PermissionProvider
       permissions={permissions}
       onPermissionError={(permission) =>
         console.error(`Permission not granted: ${permission}`)
       }
     >
       <App />
     </PermissionProvider>
   );
   ```

## Usage

Permissions are checked with a hook or enforced declaratively with a higher-order component.

### Checking a permission with the hook

`useHasPermission` returns `true` when the named permission has been granted. It must be called within a `PermissionProvider`.

```tsx
import { useHasPermission } from 'react-permission-lock';

const DocumentActions = () => {
  const canWrite = useHasPermission('write');

  return canWrite ? <button type="button">Edit</button> : null;
};
```

### Gating a component with the higher-order component

`withPermission` renders the wrapped component only when the required permission is granted. An optional fallback component is rendered, without props, when it is not.

```tsx
import { withPermission } from 'react-permission-lock';

const Report = () => <div>Confidential report</div>;

const NoAccess = () => <div>Access denied</div>;

export default withPermission('read', NoAccess)(Report);
```

Without a fallback, nothing is rendered when the permission is missing. In either case, the provider's `onPermissionError` callback receives the permission name.

## License

Licensed under the [MIT License](LICENSE).
