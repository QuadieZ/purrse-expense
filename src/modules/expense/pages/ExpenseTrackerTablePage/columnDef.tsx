import type { ColumnDef } from '@tanstack/react-table';
import type { ExpenseItem } from '../../types';

export const expenseColumns: ColumnDef<ExpenseItem>[] = [
  {
    accessorKey: 'name',
    header: 'Item',
  },
  {
    accessorKey: 'category',
    header: 'Category',
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
];
