import type { SelectOption } from "@/common/ui";

export type Expense = 'food' | 'furniture' | 'accessory'

export const EXPENSE_LABELS: Record<Expense, string> = {
    food: '🍱 Food',
    furniture: '🪑 Furniture',
    accessory: '👑 Accessory',
};

export const EXPENSE_OPTIONS: SelectOption[] = Object.keys(EXPENSE_LABELS).map((key) => ({
    label: EXPENSE_LABELS[key as Expense],
    value: key,
}));

export type ExpenseItem = {
    id: string;
    name: string;
    category: Expense;
    amount: number;
};

export type ExpenseTableItem = ExpenseItem & {
    isHighlighted: boolean;
};