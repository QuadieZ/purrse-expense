import { render, screen } from '@/test/utils/customRender';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { Typography, type TypographyProps, type TypographyVariants } from './Typography';

describe('Typography Component', () => {
  const defaultProps: TypographyProps = {
    children: 'Hello, World!',
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders when not provided variant', () => {
    render(<Typography {...defaultProps} />);

    expect(screen.getByText(defaultProps.children as string)).toBeInTheDocument();
  });

  it('renders when provided variant', () => {
    render(
      <Typography
        {...defaultProps}
        variant="h1"
      />,
    );

    expect(screen.getByText(defaultProps.children as string)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
  });

  it.each(['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])('renders heading variant %s correctly', (variant) => {
    render(
      <Typography
        {...defaultProps}
        variant={variant as TypographyVariants}
      />,
    );

    const headingElement = screen.getByText(defaultProps.children as string);
    expect(headingElement).toBeInTheDocument();
    expect(headingElement.tagName.toLowerCase()).toBe(variant);
  });

  it.each(['subtitle', 'body1', 'body2', 'body3', 'description1', 'description2'])(
    'renders variant %s correctly',
    (variant) => {
      render(
        <Typography
          {...defaultProps}
          variant={variant as TypographyVariants}
        />,
      );
      const bodyElement = screen.getByText(defaultProps.children as string);
      expect(bodyElement).toBeInTheDocument();
    },
  );

  it('applies highlight correctly', () => {
    render(
      <Typography
        {...defaultProps}
        highlightText="World!"
      />,
    );

    const highlightedText = screen.getByText('World!');
    expect(highlightedText).toBeInTheDocument();
  });
});
