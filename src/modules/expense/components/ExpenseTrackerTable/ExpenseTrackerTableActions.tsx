import { MeowButton, toaster } from '@/common/ui';
import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { useExpenseStore } from '../../stores/expenseStore';
import { mockExpenses } from './mock';
import { AddExpenseModal, ConfirmDeleteModal } from './modals';

export const ExpenseTrackerTableActions = () => {
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);

  const { deleteSelectedExpenses, setExpenses, selectedExpenses } = useExpenseStore();

  function handleDeleteExpenses() {
    if (selectedExpenses.length > 0) {
      setIsConfirmDeleteModalOpen(true);
    } else {
      toaster.create({
        title: 'No expenses selected',
        description: 'Please select at least one expense to delete',
        type: 'error',
      });
    }
  }

  return (
    <>
      <Flex
        flexWrap="wrap"
        gap={4}>
        <MeowButton
          label="Add Expense"
          onClick={() => setIsAddExpenseModalOpen(true)}
        />
        <MeowButton
          label="Delete Expense"
          variant="destructive"
          onClick={handleDeleteExpenses}
        />
        <MeowButton
          label="Duplicate Expense"
          variant="secondaryOutline"
        />
        <MeowButton
          label="Testing Expense"
          variant="secondaryOutline"
          onClick={() => setExpenses(mockExpenses)}
        />
      </Flex>
      <AddExpenseModal
        open={isAddExpenseModalOpen}
        setOpen={setIsAddExpenseModalOpen}
      />
      <ConfirmDeleteModal
        open={isConfirmDeleteModalOpen}
        setOpen={setIsConfirmDeleteModalOpen}
        handleSubmit={deleteSelectedExpenses}
      />
    </>
  );
};
