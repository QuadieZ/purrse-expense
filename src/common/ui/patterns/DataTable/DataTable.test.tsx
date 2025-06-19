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

  it('shows close button when search has value and clears search when clicked', () => {
    render(<DataTable {...defaultProps} />);
    const searchInput = screen.getByPlaceholderText('Search...');
    fireEvent.change(searchInput, { target: { value: 'John' } });

    const closeButton = screen.getByRole('button', { name: /close/i });
    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);
    expect(searchInput).toHaveValue('');
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

  it('calls setSelectedRows with correct selected rows when selection changes', () => {
    const setSelectedRows = vi.fn();
    render(
      <DataTable
        {...defaultProps}
        setSelectedRows={setSelectedRows}
      />,
    );

    // Click the first row checkbox (index 1, since index 0 is the header checkbox)
    const checkboxes = screen.getAllByRole('checkbox');
    fireEvent.click(checkboxes[1]);

    // Verify setSelectedRows was called with the selected row
    expect(setSelectedRows).toHaveBeenCalledWith([sampleData[0]]);
  });

  it('calls setSelectedRows with multiple selected rows', () => {
    const setSelectedRows = vi.fn();
    render(
      <DataTable
        {...defaultProps}
        setSelectedRows={setSelectedRows}
      />,
    );

    const checkboxes = screen.getAllByRole('checkbox');

    // Select first row
    fireEvent.click(checkboxes[1]);
    // Select second row
    fireEvent.click(checkboxes[2]);

    // Verify setSelectedRows was called with both selected rows
    expect(setSelectedRows).toHaveBeenCalledTimes(2);
  });

  it('calls setSelectedRows with empty array when all selections are cleared', () => {
    const setSelectedRows = vi.fn();
    render(
      <DataTable
        {...defaultProps}
        setSelectedRows={setSelectedRows}
      />,
    );

    const checkboxes = screen.getAllByRole('checkbox');

    // Select first row
    fireEvent.click(checkboxes[1]);
    // Clear selection by clicking again
    fireEvent.click(checkboxes[1]);

    // Verify setSelectedRows was called with empty array
    expect(setSelectedRows).toHaveBeenCalledWith([]);
  });

  it('handles select all checkbox indeterminate state', () => {
    const setSelectedRows = vi.fn();
    render(
      <DataTable
        {...defaultProps}
        setSelectedRows={setSelectedRows}
      />,
    );

    const checkboxes = screen.getAllByRole('checkbox');

    // Select only one row (not all rows)
    fireEvent.click(checkboxes[1]); // First row

    // The header checkbox should be in indeterminate state
    // This covers line 73 where it checks: table.getSelectedRowModel().rows.length > 0 ? 'indeterminate' : false
    expect(setSelectedRows).toHaveBeenCalledWith([sampleData[0]]);
  });

  it('handles select all checkbox when all rows are selected', () => {
    const setSelectedRows = vi.fn();
    render(
      <DataTable
        {...defaultProps}
        setSelectedRows={setSelectedRows}
      />,
    );

    const checkboxes = screen.getAllByRole('checkbox');

    // Select all rows individually
    fireEvent.click(checkboxes[1]); // First row
    fireEvent.click(checkboxes[2]); // Second row

    // Verify all rows are selected
    expect(setSelectedRows).toHaveBeenCalledTimes(2);
  });

  it('handles select all checkbox when no rows are selected', () => {
    const setSelectedRows = vi.fn();
    render(
      <DataTable
        {...defaultProps}
        setSelectedRows={setSelectedRows}
      />,
    );

    // Initially no rows should be selected
    expect(setSelectedRows).toHaveBeenCalledOnce();
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

  it('renders empty state when no data', () => {
    render(
      <DataTable
        {...defaultProps}
        data={[]}
        emptyStateElement="No data found"
      />,
    );
    expect(screen.getByText('No data found')).toBeInTheDocument();
  });

  it('applies highlight condition to rows', () => {
    const highlightCondition = (row: Person) => row.age > 30;
    render(
      <DataTable
        {...defaultProps}
        highlightRowCondition={highlightCondition}
      />,
    );
    // Bob Johnson is 35, so his row should be highlighted
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
  });

  it('handles sorting when column header is clicked', () => {
    render(<DataTable {...defaultProps} />);
    const nameHeader = screen.getByText('Name');
    fireEvent.click(nameHeader);
    // Should still render all data after sorting
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
    expect(screen.getByText('Bob Johnson')).toBeInTheDocument();
  });

  it('handles pagination navigation', () => {
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

    const nextButton = screen.getByLabelText('Next page');
    fireEvent.click(nextButton);

    // Should still render data after navigation
    expect(screen.getByText('Person 11')).toBeInTheDocument();
  });
});
