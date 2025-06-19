import type { Meta, StoryObj } from '@storybook/react-vite';
import { NumberInputForm } from './NumberInputForm';

const meta: Meta<typeof NumberInputForm> = {
  component: NumberInputForm,
  title: 'MeowKit/Patterns/NumberInputForm',
  args: {
    label: 'Amount',
  },
};

export default meta;
type Story = StoryObj<typeof NumberInputForm>;

export const Basic: Story = {};
