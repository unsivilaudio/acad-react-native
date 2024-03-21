import { StyleSheet, FlatList, View, Text } from 'react-native';

import type { Expense } from '@/models/expense';
import ExpenseListItem from '@/components/expenses/ExpenseListItem';

interface ExpensesListProps {
    expenses: Expense[];
}

export default function ExpensesList({ expenses }: ExpensesListProps) {
    if (expenses.length <= 0) {
        return (
            <View style={styles.fallBack}>
                <Text style={styles.fallbackText}>Nothing to see here....</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={expenses}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => <ExpenseListItem expense={item} />}
        />
    );
}

const styles = StyleSheet.create({
    fallBack: {
        flex: 1,
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fallbackText: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
    },
});
