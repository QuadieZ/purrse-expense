import { render } from '@/test/utils/customRender';
import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { NumberInputFormProps } from './NumberInputForm';
import { NumberInputForm } from './NumberInputForm';

const defaultProps: NumberInputFormProps = {
  label: 'Amount',
  value: 0,
  onChange: vi.fn(),
};

describe('NumberInputForm', () => {
  it('renders label', () => {
    render(<NumberInputForm {...defaultProps} />);
    expect(screen.getByText('Amount')).toBeInTheDocument();
  });

  it('shows required indicator when isRequired is true', () => {
    render(
      <NumberInputForm
        {...defaultProps}
        isRequired
      />,
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('shows error message when errorMessage is provided', () => {
    render(
      <NumberInputForm
        {...defaultProps}
        errorMessage="Error!"
      />,
    );
    expect(screen.getByText('Error!')).toBeInTheDocument();
  });
});
