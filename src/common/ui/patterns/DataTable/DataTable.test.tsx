import { render } from '@/test/utils/customRender';
import type { ColumnDef } from '@tanstack/react-table';
import { fireEvent, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { DataTable, type DataTableProps } from './DataTable';

type Person = {
  id: string;
  name: string;
  email: string;
  age: number;
};

const sampleData: Person[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', age: 30 },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', age: 25 },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', age: 35 },
];

const columns: ColumnDef<Person>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
];

const defaultProps: DataTableProps<Person> = {
  columns,
  data: sampleData,
  setSelectedRows: vi.fn(),
};

describe('DataTable', () => {
  it('renders table with data', () => {
    render(<DataTable {...defaultProps} />);
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
  });

  it('renders search input', () => {
    render(<DataTable {...defaultProps} />);
    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument();
  });

  it('filters data when searching', () => {
    render(<DataTable {...defaultProps} />);
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'John' } });
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument();
  });

  it('calls setSelectedRows when rows are selected', () => {
    const setSelectedRows = vi.fn();
    render(
      <DataTable
        {...defaultProps}
        setSelectedRows={setSelectedRows}
      />,
    );
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[1]); // Click first row checkbox
    expect(setSelectedRows).toHaveBeenCalled();
  });

  it('renders column headers', () => {
    render(<DataTable {...defaultProps} />);
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
  });

  it('renders pagination when data exceeds page size', () => {
    const largeData = Array.from({ length: 15 }, (_, i) => ({
      id: `${i + 1}`,
      name: `Person ${i + 1}`,
      email: `person${i + 1}@example.com`,
      age: 25 + i,
    }));
    render(
      <DataTable
        {...defaultProps}
        data={largeData}
      />,
    );
    expect(screen.getByLabelText('Next page')).toBeInTheDocument();
  });
});
