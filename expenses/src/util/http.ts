import { FIREBASE_API_BASE } from '@env';

import type { Expense } from '@/models/expense';
import axios from 'axios';

if (!FIREBASE_API_BASE) {
    throw new Error(
        'You must provide {FIREBASE_API_BASE} in your .env config file!',
    );
}

type FirebaseExpenses = {
    [id: string]: Omit<Expense, 'id' | 'date'> & { date: string };
};

type FirebasePostAdd = {
    name: string;
};

export async function storeExpense(
    expenseData: Omit<Expense, 'id'>,
): Promise<Expense> {
    const response = await axios.post<FirebasePostAdd>(
        `${FIREBASE_API_BASE}/expenses.json`,
        expenseData,
    );

    const addedExpense: Expense = {
        id: response.data.name,
        ...expenseData,
    };

    return addedExpense;
}

export async function fetchExpenses(): Promise<Expense[]> {
    const response = await axios.get<FirebaseExpenses>(
        `${FIREBASE_API_BASE}/expenses.json`,
    );

    const expenses: Expense[] = [];

    for (const key in response.data) {
        expenses.push({
            id: key,
            amount: +response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
        });
    }

    expenses.sort((a, b) => (a.date < b.date ? 1 : -1));

    return expenses;
}

export async function updateExpense({
    id,
    ...expData
}: Expense): Promise<Expense> {
    await axios.put(`${FIREBASE_API_BASE}/events/${id}.json`, expData);

    return {
        id,
        ...expData,
    };
}

export async function deleteExpense(id: string) {
    await axios.delete(`${FIREBASE_API_BASE}/events/${id}.json`);
}
