import { Stack } from '@chakra-ui/react';
import { DataTable } from '../../../../common/ui';
import { ExpenseTrackerTableActions, ExpenseTrackerTableHeader } from '../../components';
import { EmptyStateElement } from '../../components/ExpenseTrackerTable/EmptyStateElement';
import { useExpenseStore } from '../../stores/expenseStore';
import { EXPENSE_LABELS, type ExpenseItem } from '../../types';
import { expenseColumns } from './columnDef';

export const ExpenseTrackerTablePage = () => {
  const { expenses } = useExpenseStore();

  return (
    <Stack
      px={16}
      gap={8}>
      <Stack>
        <ExpenseTrackerTableHeader />
        <ExpenseTrackerTableActions />
      </Stack>
      <Stack>
        <DataTable
          columns={expenseColumns}
          data={
            expenses.map((expense) => ({
              ...expense,
              category: EXPENSE_LABELS[expense.category],
            })) as ExpenseItem[]
          }
          setSelectedRows={() => {}}
          emptyStateElement={<EmptyStateElement />}
        />
      </Stack>
    </Stack>
  );
};
