import { View, Text, StyleSheet } from 'react-native';

import type { Expense } from '@/models/expense';
import { GlobalStyles } from '@/constants/styles';

interface ExpensesSummaryProps {
    expenses: Expense[];
    periodName: string;
}

export default function ExpensesSummary({
    expenses,
    periodName,
}: ExpensesSummaryProps) {
    const expensesSum = expenses.reduce((a, b) => a + b.amount, 0);

    return (
        <View style={styles.container}>
            <Text style={styles.period}>{periodName}</Text>
            <Text style={styles.sum}>${expensesSum.toFixed(2)}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        backgroundColor: GlobalStyles.Colors.primary50,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    period: {
        fontSize: 12,
        color: GlobalStyles.Colors.primary400,
    },
    sum: {
        fontSize: 16,
        fontWeight: 'bold',
        color: GlobalStyles.Colors.primary500,
    },
});
