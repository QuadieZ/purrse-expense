import { render } from '@/test/utils/customRender';
import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import type { InputFormProps } from './InputForm';
import { InputForm } from './InputForm';

const defaultProps: InputFormProps = {
  label: 'Username',
  placeholder: 'Enter username',
  value: '',
  onChange: vi.fn(),
};

describe('InputForm', () => {
  it('renders label and placeholder', () => {
    render(<InputForm {...defaultProps} />);
    expect(screen.getByText('Username')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter username')).toBeInTheDocument();
  });

  it('shows required indicator when isRequired is true', () => {
    render(
      <InputForm
        {...defaultProps}
        isRequired
      />,
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('shows error message when errorMessage is provided', () => {
    render(
      <InputForm
        {...defaultProps}
        errorMessage="Error!"
      />,
    );
    expect(screen.getByText('Error!')).toBeInTheDocument();
  });

  it('calls onChange when input value changes', () => {
    const onChange = vi.fn();
    render(
      <InputForm
        {...defaultProps}
        onChange={onChange}
      />,
    );
    const input = screen.getByPlaceholderText('Enter username');
    fireEvent.change(input, { target: { value: 'newuser' } });
    expect(onChange).toHaveBeenCalledWith('newuser');
  });
});
