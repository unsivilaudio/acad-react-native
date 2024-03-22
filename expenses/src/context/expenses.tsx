import {
    createContext,
    useReducer,
    type PropsWithChildren,
    useEffect,
    useCallback,
    useState,
} from 'react';

import type { Expense } from '@/models/expense';
import { fetchExpenses } from '@/util/http';

const __INITIAL_STATE = {
    expenses: [] as Expense[],
};

type ExpenseContextState = typeof __INITIAL_STATE;

type ExpenseContextValue = ExpenseContextState & {
    addExpense(exp: Omit<Expense, 'id'>): void;
    deleteExpense(expId: string): void;
    updateExpense(exp: Expense): void;
    clearError(): void;
    isLoading: boolean;
    error: string | null;
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

type SET_EXPENSES = {
    type: 'SET_EXPENSES';
    payload: Expense[];
};

type UPDATE_EXPENSE = {
    type: 'UPDATE_EXPENSE';
    payload: Expense;
};

type ExpenseActions =
    | ADD_EXPENSE
    | DELETE_EXPENSE
    | SET_EXPENSES
    | UPDATE_EXPENSE;

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
        case 'SET_EXPENSES':
            return {
                ...state,
                expenses: action.payload,
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
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<null | string>(null);

    const getExpenses = useCallback(async () => {
        setIsLoading(true);
        try {
            const expenses = await fetchExpenses();
            dispatch({ type: 'SET_EXPENSES', payload: expenses });
        } catch (err: unknown) {
            setError((err as Error).message);
        }
        setIsLoading(false);
    }, []);

    useEffect(() => {
        getExpenses();
    }, [getExpenses]);

    function addExpense(exp: Expense) {
        dispatch({ type: 'ADD_EXPENSE', payload: exp });
    }

    function deleteExpense(id: string) {
        dispatch({ type: 'DELETE_EXPENSE', payload: { id } });
    }

    function updateExpense(exp: Expense) {
        dispatch({ type: 'UPDATE_EXPENSE', payload: exp });
    }

    function clearError() {
        setIsLoading(false);
        setError(null);
    }

    const sortedExpenses = [...state.expenses].sort((a, b) =>
        a.date < b.date ? 1 : -1,
    );
    const expenseCtxValue: ExpenseContextValue = {
        expenses: sortedExpenses,
        addExpense,
        deleteExpense,
        updateExpense,
        isLoading,
        clearError,
        error,
    };
    return (
        <ExpensesContext.Provider value={expenseCtxValue}>
            {children}
        </ExpensesContext.Provider>
    );
}
