import { MeowButton } from '@/common/ui';
import { Flex } from '@chakra-ui/react';
import { useState } from 'react';
import { AddExpenseModal } from './AddExpenseModal';

export const ExpenseTrackerTableActions = () => {
  const [isAddExpenseModalOpen, setIsAddExpenseModalOpen] = useState(false);

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
        />
        <MeowButton
          label="Duplicate Expense"
          variant="secondaryOutline"
        />
        <MeowButton
          label="Edit Expense"
          variant="secondaryOutline"
        />
      </Flex>
      <AddExpenseModal
        open={isAddExpenseModalOpen}
        setOpen={setIsAddExpenseModalOpen}
      />
    </>
  );
};
