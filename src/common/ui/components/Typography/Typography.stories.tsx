import type { Meta, StoryObj } from '@storybook/react-vite';
import { Typography } from './Typography';

const meta: Meta<typeof Typography> = {
  component: Typography,
  title: 'MeowKit/Components/Typography',
  parameters: {
    docs: {
      description: {
        component: `
  **Typography Component**:
  
  - Supports **Chakra UI \`TextProps\`** for customization (e.g., \`color\`, \`fontWeight\`, \`textAlign\`, etc.).
  - Special Props:
    - \`variant\`: Typography style (e.g., headings, body, descriptions).
    - \`highlightText\`: Highlight a substring.
    - \`highlightColor\`: Color of the highlighted text.
  
  This component behaves like Chakra UI's \`Text\` and \`Heading\`, with added variant support.
          `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'h1',
        'h2',
        'h3',
        'h4',
        'h5',
        'h6',
        'subtitle',
        'body1',
        'body2',
        'body3',
        'description1',
        'description2',
      ],
      description: 'Defines the text style variant.',
      table: {
        defaultValue: { summary: 'body1' },
        type: { summary: 'TypographyVariants' },
      },
    },
    children: {
      control: 'text',
      description: 'The text content to display.',
    },
    highlightText: {
      control: 'text',
      description: 'Optional substring to highlight within the text.',
    },
    highlightColor: {
      control: 'color',
      description: 'Color to apply to the highlighted text.',
      table: {
        defaultValue: { summary: 'brand.primary' },
      },
    },
  },
  args: {
    children: 'Hello, World!',
  },
};

export default meta;
type Story = StoryObj<typeof Typography>;

export const Primary: Story = {};

export const Heading: Story = {
  render: (args) => (
    <>
      <Typography
        variant="h1"
        {...args}
      />
      <Typography
        variant="h2"
        {...args}
      />
      <Typography
        variant="h3"
        {...args}
      />
      <Typography
        variant="h4"
        {...args}
      />
      <Typography
        variant="h5"
        {...args}
      />
      <Typography
        variant="h6"
        {...args}
      />
    </>
  ),
};

export const Body: Story = {
  render: (args) => (
    <>
      <Typography
        variant="subtitle"
        {...args}
      />
      <Typography
        variant="body1"
        {...args}
      />
      <Typography
        variant="body2"
        {...args}
      />
      <Typography
        variant="body3"
        {...args}
      />
      <Typography
        variant="description1"
        {...args}
      />
      <Typography
        variant="description2"
        {...args}
      />
    </>
  ),
};

export const Highlight: Story = {
  args: {
    highlightText: 'Hello',
  },
};
