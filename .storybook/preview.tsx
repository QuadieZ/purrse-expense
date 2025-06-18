import type { Preview } from '@storybook/react-vite';
import React from 'react';
import { MeowKitProvider } from '../src/app/providers/MeowKitProvider';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MeowKitProvider>
        <Story />
      </MeowKitProvider>
    ),
  ],
};

export default preview;
