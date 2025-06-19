import type { Meta, StoryObj } from '@storybook/react-vite';
import type { ColumnDef } from '@tanstack/react-table';
import { DataTable } from './DataTable';

type Person = {
  id: string;
  name: string;
  email: string;
  age: number;
  department: string;
};

const sampleData: Person[] = [
  { id: '1', name: 'John Doe', email: 'john@example.com', age: 30, department: 'Engineering' },
  { id: '2', name: 'Jane Smith', email: 'jane@example.com', age: 25, department: 'Marketing' },
  { id: '3', name: 'Bob Johnson', email: 'bob@example.com', age: 35, department: 'Sales' },
  { id: '4', name: 'Alice Brown', email: 'alice@example.com', age: 28, department: 'Engineering' },
  { id: '5', name: 'Charlie Wilson', email: 'charlie@example.com', age: 32, department: 'HR' },
  { id: '6', name: 'Diana Davis', email: 'diana@example.com', age: 27, department: 'Marketing' },
  { id: '7', name: 'Eve Miller', email: 'eve@example.com', age: 29, department: 'Sales' },
  { id: '8', name: 'Frank Garcia', email: 'frank@example.com', age: 31, department: 'Engineering' },
  { id: '9', name: 'Grace Lee', email: 'grace@example.com', age: 26, department: 'HR' },
  { id: '10', name: 'Henry Taylor', email: 'henry@example.com', age: 33, department: 'Marketing' },
  { id: '11', name: 'Ivy Chen', email: 'ivy@example.com', age: 24, department: 'Sales' },
  { id: '12', name: 'Jack Anderson', email: 'jack@example.com', age: 34, department: 'Engineering' },
];

const columns: ColumnDef<Person>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
  },
  {
    accessorKey: 'email',
    header: 'Email',
    enableSorting: false,
  },
  {
    accessorKey: 'age',
    header: 'Age',
  },
  {
    accessorKey: 'department',
    header: 'Department',
  },
];

const meta: Meta<typeof DataTable<Person>> = {
  title: 'UI/Patterns/DataTable',
  component: DataTable,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    columns,
    data: sampleData,
    setSelectedRows: (rows) => console.log('Selected rows:', rows),
  },
};

export const Empty: Story = {
  args: {
    columns,
    data: [],
    setSelectedRows: (rows) => console.log('Selected rows:', rows),
  },
};
