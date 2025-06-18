import type { Meta, StoryObj } from '@storybook/react-vite';
import { MeowButton } from '../../components';
import { Modal } from './Modal';

const meta: Meta<typeof Modal> = {
  component: Modal,
  title: 'MeowKit/Modal',
  args: {
    title: 'Modal',
    triggerElement: (
      <MeowButton
        label="Open Dialog"
        variant="primary"
      />
    ),
  },
};

export default meta;
type Story = StoryObj<typeof Modal>;

export const Basic: Story = {};
