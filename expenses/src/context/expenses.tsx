import { createContext, useReducer, type PropsWithChildren } from 'react';

import { DUMMY_EXPENSES } from '@/models/mock/dummy-data';
import type { Expense } from '@/models/expense';

const __INITIAL_STATE = {
    expenses: DUMMY_EXPENSES,
};

type ExpenseContextState = typeof __INITIAL_STATE;

type ExpenseContextValue = ExpenseContextState & {
    addExpense(exp: Omit<Expense, 'id'>): void;
    deleteExpense(expId: string): void;
    updateExpense(exp: Expense): void;
};

export const ExpensesContext = createContext<ExpenseContextValue | null>(null);

type ADD_EXPENSE = {
    type: 'ADD_EXPENSE';
    payload: Expense;
};

type DELETE_EXPENSE = {
    type: 'DELETE_EXPENSE';
    payload: {
        id: string;
    };
};

type UPDATE_EXPENSE = {
    type: 'UPDATE_EXPENSE';
    payload: Expense;
};

type ExpenseActions = ADD_EXPENSE | DELETE_EXPENSE | UPDATE_EXPENSE;

function expensesReducer(state: ExpenseContextState, action: ExpenseActions) {
    let itemIdx, updatedExpenses;
    switch (action.type) {
        case 'ADD_EXPENSE':
            return {
                ...state,
                expenses: state.expenses.concat(action.payload),
            };
        case 'DELETE_EXPENSE':
            return {
                ...state,
                expenses: state.expenses.filter(
                    (exp) => exp.id !== action.payload.id,
                ),
            };
        case 'UPDATE_EXPENSE':
            itemIdx = state.expenses.findIndex(
                (exp) => exp.id === action.payload.id,
            );
            if (itemIdx >= 0) {
                updatedExpenses = [...state.expenses];
                updatedExpenses[itemIdx] = action.payload;
                return {
                    ...state,
                    expenses: updatedExpenses,
                };
            }
            return state;
        default:
            return state;
    }
}

export default function ExpensesContextProvider({
    children,
}: PropsWithChildren) {
    const [state, dispatch] = useReducer(expensesReducer, __INITIAL_STATE);

    function addExpense(exp: Omit<Expense, 'id'>) {
        const newExpense = {
            ...exp,
            id: Math.round(Math.random() * 1e10).toString(16),
        };

        dispatch({ type: 'ADD_EXPENSE', payload: newExpense });
    }

    function deleteExpense(id: string) {
        dispatch({ type: 'DELETE_EXPENSE', payload: { id } });
    }

    function updateExpense(exp: Expense) {
        dispatch({ type: 'UPDATE_EXPENSE', payload: exp });
    }

    const expenseCtxValue: ExpenseContextValue = {
        ...state,
        addExpense,
        deleteExpense,
        updateExpense,
    };
    return (
        <ExpensesContext.Provider value={expenseCtxValue}>
            {children}
        </ExpensesContext.Provider>
    );
}
