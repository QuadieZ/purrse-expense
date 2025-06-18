import type { Meta, StoryObj } from '@storybook/react-vite';
import { InputForm } from './InputForm';

const meta: Meta<typeof InputForm> = {
  component: InputForm,
  title: 'MeowKit/InputForm',
  args: {
    label: 'Email',
    placeholder: 'me@example.com',
    value: '',
    onChange: () => {},
  },
};

export default meta;
type Story = StoryObj<typeof InputForm>;

export const Basic: Story = {};
