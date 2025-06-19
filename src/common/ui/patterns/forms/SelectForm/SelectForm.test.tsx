import { render } from '@/test/utils/customRender';
import { screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { SelectForm, type SelectFormProps, type SelectOption } from './SelectForm';

const options: SelectOption[] = [
  { label: 'Option 1', value: '1' },
  { label: 'Option 2', value: '2' },
];

const defaultProps: SelectFormProps = {
  label: 'Select Label',
  options,
  value: [],
  onChange: vi.fn(),
  placeholder: 'Select an option',
};

describe('SelectForm', () => {
  it('renders label and placeholder', () => {
    render(<SelectForm {...defaultProps} />);
    expect(screen.getByText('Select Label')).toBeInTheDocument();
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });

  it('shows required indicator when isRequired is true', () => {
    render(
      <SelectForm
        {...defaultProps}
        isRequired
      />,
    );
    expect(screen.getByText('*')).toBeInTheDocument();
  });

  it('shows error message when errorMessage is provided', () => {
    render(
      <SelectForm
        {...defaultProps}
        errorMessage="Error!"
      />,
    );
    expect(screen.getByText('Error!')).toBeInTheDocument();
  });
});
