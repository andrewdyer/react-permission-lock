import type { Meta, StoryObj } from '@storybook/react-vite';

import withPermission from './withPermission';
import { PermissionProvider } from '../../contexts';

interface DashboardProps {
  title: string;
}

const Dashboard = ({ title }: DashboardProps) => <h2>{title}</h2>;

const NoAccess = () => <p>You do not have access to the dashboard.</p>;

const ProtectedDashboard = withPermission(
  'VIEW_DASHBOARD',
  NoAccess
)(Dashboard);

const meta = {
  title: 'HOCs/withPermission',
  component: ProtectedDashboard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  args: {
    title: 'Dashboard',
  },
} satisfies Meta<typeof ProtectedDashboard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const WithPermission: Story = {
  decorators: [
    (Story) => (
      <PermissionProvider permissions={['VIEW_DASHBOARD']}>
        <Story />
      </PermissionProvider>
    ),
  ],
};

export const WithoutPermission: Story = {
  decorators: [
    (Story) => (
      <PermissionProvider permissions={[]}>
        <Story />
      </PermissionProvider>
    ),
  ],
};
