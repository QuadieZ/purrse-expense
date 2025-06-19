import { MeowButton, toaster } from '@/common/ui';
import { Flex } from '@chakra-ui/react';
import { Plus, Trash } from 'lucide-react';
import { useState } from 'react';
import { useExpenseStore } from '../../stores/expenseStore';
import { AddExpenseModal, ConfirmDeleteModal } from './modals';

export const ExpenseTrackerTableActions = () => {
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] = useState(false);

  const { deleteSelectedExpenses, selectedExpenses } = useExpenseStore();

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
        gap={[2, 4]}>
        <MeowButton
          icon={<Plus />}
          label="Add Expense"
          onClick={() => setIsAddExpenseModalOpen(true)}
        />
        <MeowButton
          icon={<Trash />}
          bg="white"
          label="Delete Expense"
          variant="secondaryOutline"
          onClick={handleDeleteExpenses}
        />
        {/* <MeowButton
          label="Duplicate Expense"
          variant="secondaryOutline"
        /> */}
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
