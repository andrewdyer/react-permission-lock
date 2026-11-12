import type { Meta, StoryObj } from '@storybook/react-vite';
import { useContext } from 'react';
import { fn } from 'storybook/test';

import PermissionContext from '../PermissionContext';
import PermissionProvider from './PermissionProvider';

const PermissionChecks = () => {
  const context = useContext(PermissionContext);

  if (!context) {
    return <p>No permission context</p>;
  }

  return (
    <ul>
      {['read', 'write', 'delete'].map((permission) => (
        <li key={permission}>
          {permission}:{' '}
          {context.hasPermission(permission) ? 'granted' : 'denied'}
        </li>
      ))}
    </ul>
  );
};

const meta = {
  title: 'Contexts/PermissionProvider',
  component: PermissionProvider,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    permissions: ['read', 'write'],
    onPermissionError: fn(),
    children: <PermissionChecks />,
  },
} satisfies Meta<typeof PermissionProvider>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const ReadOnly: Story = {
  args: {
    permissions: ['read'],
  },
};
