import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type ExpenseItem } from '../types';

type ExpenseStore = {
    expenses: ExpenseItem[];
    addExpense: (expense: ExpenseItem) => void;
    updateExpense: (expense: ExpenseItem) => void;
    duplicateExpense: (id: string) => void;
    deleteExpense: (id: string) => void;
};

export const useExpenseStore = create<ExpenseStore>()(
    persist(
        (set, get) => ({
            expenses: [],
            addExpense: (expense) => {
                console.log('addExpense', expense)
                set((state) => ({ expenses: [...state.expenses, expense] }))
            },
            updateExpense: (expense) => {
                const updatedExpenses = get().expenses.map((e) => e.id === expense.id ? expense : e)
                set({ expenses: updatedExpenses })
            },
            duplicateExpense: (id) => {
                const expenses = get().expenses
                const targetExpenseIndex = expenses.findIndex((expense) => expense.id === id)
                if (targetExpenseIndex === -1) return;
                const targetExpense = expenses[targetExpenseIndex]

                set({ expenses: [...expenses.slice(0, targetExpenseIndex + 1), targetExpense, ...expenses.slice(targetExpenseIndex + 1)] })
            },
            deleteExpense: (id) => {
                const filterExpenses = get().expenses.filter((expense) => expense.id !== id)
                set({ expenses: filterExpenses })
            },
        })
        , {
            name: 'expense-store',
        })
)