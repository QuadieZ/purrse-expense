import { InputForm, MeowButton, Modal, NumberInputForm, SelectForm, Typography } from '@/common/ui';
import { Stack } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { getCatFact } from '../../../../common/utils/getCatFact';
import { useExpenseStore } from '../../stores/expenseStore';
import { EXPENSE_OPTIONS, type Expense } from '../../types';

export const AddExpenseModal = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
  const { addExpense } = useExpenseStore();

  const [name, setName] = useState('');
  const [amount, setAmount] = useState(0);
  const [category, setCategory] = useState<Expense[]>([]);
  const [catFact, setCatFact] = useState('');

  const [nameError, setNameError] = useState('');
  const [amountError, setAmountError] = useState('');
  const [categoryError, setCategoryError] = useState('');

  useEffect(() => {
    if (open) {
      setName('');
      setAmount(0);
      setCategory([]);
      setNameError('');
      setAmountError('');
      setCategoryError('');
      getCatFact().then((data) => setCatFact(data.fact));
    } else {
      setCatFact('');
    }
  }, [open]);

  function handleSubmit() {
    const isNameValid = name.length > 0;
    const isAmountValid = amount > 0;
    const isCategoryValid = category.length > 0;
    if (!isNameValid) {
      setNameError('Name is required');
    } else {
      setNameError('');
    }
    if (!isAmountValid) {
      setAmountError('Amount is required');
    } else {
      setAmountError('');
    }
    if (!isCategoryValid) {
      setCategoryError('A Category is required');
    } else {
      setCategoryError('');
    }

    if (isNameValid && isAmountValid && isCategoryValid) {
      addExpense({ name, amount, category: category[0], id: uuidv4() });
      setOpen(false);
    }
  }

  return (
    <Modal
      open={open}
      setOpen={setOpen}
      title="Add Expense"
      unmountOnExit
      primaryCta={
        <MeowButton
          label="Submit"
          enableHoverAnimation={false}
          onClick={handleSubmit}
        />
      }
      secondaryCta={
        <MeowButton
          label="Cancel"
          onClick={() => setOpen(false)}
          enableHoverAnimation={false}
          variant="secondaryOutline"
        />
      }>
      <Stack
        w="100%"
        gap={4}>
        <Stack
          w="100%"
          gap={4}>
          <InputForm
            label="Item:"
            isRequired
            placeholder="Cat's paw"
            value={name}
            onChange={(value) => setName(value)}
            size="sm"
            labelWidth="100px"
            errorMessage={nameError}
          />
          <NumberInputForm
            isRequired
            label="Amount:"
            value={amount}
            onChange={(value: number) => setAmount(value)}
            size="sm"
            labelWidth="100px"
            errorMessage={amountError}
          />
          <SelectForm
            isRequired
            label="Category"
            placeholder="Select a category"
            value={category}
            onChange={(value: string[]) => setCategory(value as Expense[])}
            options={EXPENSE_OPTIONS}
            size="sm"
            labelWidth="100px"
            errorMessage={categoryError}
            isModal
          />
        </Stack>
        <Typography
          variant="description1"
          color="gray.500">
          🐱 Random Cat Fact: <br />
          {catFact ? catFact : 'Following fur balls...'}
        </Typography>
      </Stack>
    </Modal>
  );
};
