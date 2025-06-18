import type { Meta, StoryObj } from '@storybook/react-vite';
import { SelectForm } from './SelectForm';

const meta: Meta<typeof SelectForm> = {
  component: SelectForm,
  title: 'MeowKit/SelectForm',
  args: {
    label: 'Select',
    options: [
      { label: 'Option 1', value: 'option1' },
      { label: 'Option 2', value: 'option2' },
      { label: 'Option 3', value: 'option3' },
    ],
  },
};

export default meta;
type Story = StoryObj<typeof SelectForm>;

export const Basic: Story = {};
