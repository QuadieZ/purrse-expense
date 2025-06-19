import { Stack } from '@chakra-ui/react';
import { DataTable } from '../../../../common/ui';
import { ExpenseTrackerTableActions, ExpenseTrackerTableHeader } from '../../components';
import { EmptyStateElement } from '../../components/ExpenseTrackerTable/EmptyStateElement';
import { useExpenseStore } from '../../stores/expenseStore';
import { expenseColumns } from './columnDef';

export const ExpenseTrackerTablePage = () => {
  const { expenses, setSelectedExpenses, isMostSpentCategory } = useExpenseStore();

  return (
    <Stack
      gap={8}
      overflow="hidden"
      flex={1}>
      <Stack>
        <ExpenseTrackerTableHeader />
        <ExpenseTrackerTableActions />
      </Stack>
      <Stack
        flex={1}
        overflow="hidden"
        px={2}>
        <DataTable
          columns={expenseColumns}
          data={expenses}
          setSelectedRows={(rows) => {
            setSelectedExpenses(rows.map((row) => row.id));
          }}
          emptyStateElement={<EmptyStateElement />}
          highlightRowCondition={(row) => {
            console.log(row);
            return isMostSpentCategory[row.category];
          }}
        />
      </Stack>
    </Stack>
  );
};
