import { ExpensesContext } from '@/context/expenses';
import { useContext } from 'react';

export default function useExpensesContext() {
    const ctx = useContext(ExpensesContext);

    if (!ctx) {
        throw new Error(
            'You must use this context in the scope of a <ExpenseContextProvider> component!',
        );
    }

    return ctx;
}
