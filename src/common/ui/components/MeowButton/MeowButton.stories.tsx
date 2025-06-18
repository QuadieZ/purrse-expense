import { Stack } from '@chakra-ui/react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { MeowButton } from './MeowButton';

const meta: Meta<typeof MeowButton> = {
  component: MeowButton,
  title: 'MeowKit/MeowButton',
  args: {
    label: 'Button',
  },
};

export default meta;
type Story = StoryObj<typeof MeowButton>;

export const Basic: Story = {};

export const Variants: Story = {
  render: (args) => (
    <Stack>
      <MeowButton
        variant="primary"
        {...args}
      />
      <MeowButton
        variant="secondaryOutline"
        {...args}
      />
      <MeowButton
        variant="secondarySolid"
        {...args}
      />
      <MeowButton
        variant="ghost"
        {...args}
      />
      <MeowButton
        variant="plain"
        {...args}
      />
      <MeowButton
        variant="destructive"
        {...args}
      />
    </Stack>
  ),
};

export const FullWidth: Story = {
  args: {
    fullWidth: true,
  },
};

export const Disabled: Story = {
  args: {
    isDisabled: true,
  },
  render: (args) => (
    <Stack>
      <MeowButton
        variant="primary"
        {...args}
      />
      <MeowButton
        variant="secondaryOutline"
        {...args}
      />
      <MeowButton
        variant="secondarySolid"
        {...args}
      />
      <MeowButton
        variant="ghost"
        {...args}
      />
      <MeowButton
        variant="plain"
        {...args}
      />
      <MeowButton
        variant="destructive"
        {...args}
      />
    </Stack>
  ),
};

export const AsLink: Story = {
  args: {
    href: 'https://chakra-ui.com/docs/components/button#as-link',
  },
};
