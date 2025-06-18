import { MeowKitProvider } from '@/app';
import { render, type RenderOptions } from '@testing-library/react';

const customRender = (ui: React.ReactElement, options?: RenderOptions) =>
  render(ui, { wrapper: MeowKitProvider, ...options });

export { act, fireEvent, screen, waitFor } from '@testing-library/react';
export { customRender as render };
