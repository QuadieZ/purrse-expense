import type { ColumnDef } from '@tanstack/react-table';
import { EXPENSE_LABELS, type ExpenseItem } from '../../types';

export const expenseColumns: ColumnDef<ExpenseItem>[] = [
  {
    accessorKey: 'name',
    header: 'Item',
  },
  {
    accessorKey: 'category',
    header: 'Category',
    cell: ({ row }) => {
      const categoryValue = row.original.category;
      return EXPENSE_LABELS[categoryValue];
    },
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
  },
];
