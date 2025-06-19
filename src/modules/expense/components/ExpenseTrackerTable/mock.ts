import { v4 as uuidv4 } from 'uuid';
import { type ExpenseItem } from "../../types";

export const mockExpenses: ExpenseItem[] = [
    {
        id: uuidv4(),
        name: 'Expense 1',
        amount: 100,
        category: 'food',
    },
    {
        id: uuidv4(),
        name: 'Expense 2',
        amount: 100,
        category: 'accessory'
    },
    {
        id: uuidv4(),
        name: 'Expense 3',
        amount: 100,
        category: 'furniture',
    },
    {
        id: uuidv4(),
        name: 'Expense 4',
        amount: 100,
        category: 'food',
    },
    {
        id: uuidv4(),
        name: 'Expense 5',
        amount: 100,
        category: 'food',
    },
    {
        id: uuidv4(),
        name: 'Expense 6',
        amount: 100,
        category: 'furniture',
    }

];