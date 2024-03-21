import { StyleSheet, FlatList } from 'react-native';
import type { Expense } from '@/models/expense';
import ExpenseListItem from '@/components/expenses/ExpenseListItem';

interface ExpensesListProps {
    expenses: Expense[];
}

export default function ExpensesList({ expenses }: ExpensesListProps) {
    return (
        <FlatList
            data={expenses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ExpenseListItem expense={item} />}
        />
    );
}

const styles = StyleSheet.create({});
