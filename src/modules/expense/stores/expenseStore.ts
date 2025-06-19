import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Expense, type ExpenseItem } from '../types';

type ExpenseStore = {
    expenses: ExpenseItem[];
    expensesByCategory: Record<Expense, number>;
    isMostSpentCategory: Record<Expense, boolean>;
    selectedExpenses: string[]
    calculateExpensesByCategory: () => void;
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
            expensesByCategory: {
                food: 0,
                furniture: 0,
                accessory: 0,
            },
            isMostSpentCategory: {
                food: false,
                furniture: false,
                accessory: false,
            },
            calculateExpensesByCategory: () => {
                const expenses = get().expenses
                const expensesByCategory = expenses.reduce((acc, expense) => {
                    acc[expense.category] = (acc[expense.category] || 0) + expense.amount
                    return acc
                }, {} as Record<Expense, number>)
                const mostValue = Math.max(...Object.values(expensesByCategory))
                const isMostSpentCategory = {
                    food: expensesByCategory.food === mostValue,
                    furniture: expensesByCategory.furniture === mostValue,
                    accessory: expensesByCategory.accessory === mostValue,
                }
                console.log(isMostSpentCategory)
                console.log(expensesByCategory)
                set({ expensesByCategory, isMostSpentCategory })
            },
            setSelectedExpenses: (expenses) => {
                set({ selectedExpenses: expenses })
            },
            setExpenses: (expenses) => {
                set({ expenses })
                get().calculateExpensesByCategory()
            },
            addExpense: (expense) => {
                set((state) => ({ expenses: [expense, ...state.expenses] }))
                get().calculateExpensesByCategory()
            },
            updateExpense: (expense) => {
                const updatedExpenses = get().expenses.map((e) => e.id === expense.id ? expense : e)
                set({ expenses: updatedExpenses })
                get().calculateExpensesByCategory()
            },
            duplicateExpense: (id) => {
                const expenses = get().expenses
                const targetExpenseIndex = expenses.findIndex((expense) => expense.id === id)
                if (targetExpenseIndex === -1) return;
                const targetExpense = expenses[targetExpenseIndex]

                set({ expenses: [...expenses.slice(0, targetExpenseIndex + 1), targetExpense, ...expenses.slice(targetExpenseIndex + 1)] })
                get().calculateExpensesByCategory()
            },
            deleteSelectedExpenses: () => {
                const expenses = get().expenses
                const selectedExpenses = get().selectedExpenses
                const updatedExpenses = expenses.filter((expense) => !selectedExpenses.includes(expense.id))
                set({ expenses: updatedExpenses, selectedExpenses: [] })
                get().calculateExpensesByCategory()
            }
        })
        , {
            name: 'expense-store',
        })
)