import { render, screen } from '@/test/utils/customRender';
import { fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { MeowButton } from './MeowButton';

describe('Button', () => {
  it('renders with the correct label', () => {
    render(<MeowButton label="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('renders with the correct variant props', () => {
    render(
      <MeowButton
        variant="secondaryOutline"
        label="Secondary"
      />,
    );
    expect(screen.getByText('Secondary')).toBeInTheDocument();
  });

  it('renders icon correctly when provided', () => {
    const mockIcon = <span data-testid="mock-icon">*</span>;
    render(
      <MeowButton
        variant="primary"
        label="With Icon"
        icon={mockIcon}
      />,
    );
    expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
  });

  it('disables button when isDisabled is true', async () => {
    render(
      <MeowButton
        variant="primary"
        label="Disabled"
        isDisabled
      />,
    );
    const button = screen.getByText('Disabled').closest('button');
    expect(button).toBeDisabled();
  });

  it('opens internal links in same tab', () => {
    render(
      <MeowButton
        variant="primary"
        label="Internal Link"
        href="#"
      />,
    );
    const link = screen.getByText('Internal Link').closest('a');
    expect(link).toHaveAttribute('target', '_self');
  });

  it('opens external links in a new tab', () => {
    render(
      <MeowButton
        variant="primary"
        label="External Link"
        href="https://example.com"
      />,
    );
    const link = screen.getByText('External Link').closest('a');
    expect(link).toHaveAttribute('target', '_blank');
  });

  it('prevents click on disabled link', async () => {
    render(
      <MeowButton
        variant="primary"
        label="Disabled Link"
        href="https://example.com"
        isDisabled
      />,
    );
    const link = screen.getByText('Disabled Link').closest('a');
    await fireEvent.click(link!);
    expect(link).toHaveAttribute('data-disabled');
  });

  it('renders full-width button when fullWidth is true', () => {
    render(
      <MeowButton
        variant="primary"
        label="Full Width"
        fullWidth
      />,
    );
    const button = screen.getByText('Full Width').closest('button');
    expect(button).toHaveStyle({ width: '100%' });
  });

  it('renders fit-content button when fullWidth is false', () => {
    render(
      <MeowButton
        variant="primary"
        label="Fit Content"
      />,
    );
    const button = screen.getByText('Fit Content').closest('button');
    expect(button).toHaveStyle({ width: 'fit-content' });
  });
});
