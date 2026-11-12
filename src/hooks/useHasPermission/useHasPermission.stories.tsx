import type { Meta, StoryObj } from '@storybook/react-vite';

import useHasPermission from './useHasPermission';
import { PermissionProvider } from '../../contexts';

interface PermissionStatusProps {
  permission: string;
}

const PermissionStatus = ({ permission }: PermissionStatusProps) => {
  const hasPermission = useHasPermission(permission);

  return (
    <p>
      {permission}: {hasPermission ? 'granted' : 'denied'}
    </p>
  );
};

const meta = {
  title: 'Hooks/useHasPermission',
  component: PermissionStatus,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <PermissionProvider permissions={['read']}>
        <Story />
      </PermissionProvider>
    ),
  ],
} satisfies Meta<typeof PermissionStatus>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Granted: Story = {
  args: {
    permission: 'read',
  },
};

export const Denied: Story = {
  args: {
    permission: 'write',
  },
};
