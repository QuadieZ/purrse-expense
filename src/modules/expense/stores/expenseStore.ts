import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type ExpenseItem } from '../types';

type ExpenseStore = {
    expenses: ExpenseItem[];
    selectedExpenses: string[]
    setExpenses: (expenses: ExpenseItem[]) => void;
    setSelectedExpenses: (expenses: string[]) => void;
    addExpense: (expense: ExpenseItem) => void;
    updateExpense: (expense: ExpenseItem) => void;
    duplicateExpense: (id: string) => void;
    deleteSelectedExpenses: () => void;
};

export const useExpenseStore = create<ExpenseStore>()(
    persist(
        (set, get) => ({
            expenses: [],
            selectedExpenses: [],
            setSelectedExpenses: (expenses) => {
                set({ selectedExpenses: expenses })
            },
            setExpenses: (expenses) => {
                set({ expenses })
            },
            addExpense: (expense) => {
                set((state) => ({ expenses: [expense, ...state.expenses] }))
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
            deleteSelectedExpenses: () => {
                const expenses = get().expenses
                const selectedExpenses = get().selectedExpenses
                const updatedExpenses = expenses.filter((expense) => !selectedExpenses.includes(expense.id))
                set({ expenses: updatedExpenses, selectedExpenses: [] })
            }
        })
        , {
            name: 'expense-store',
        })
)