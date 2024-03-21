import { View, StyleSheet } from 'react-native';

import type { Expense } from '@/models/expense';
import { GlobalStyles } from '@/constants/styles';
import ExpensesSummary from '@/components/expenses/ExpensesSummary';
import ExpensesList from '@/components/expenses/ExpensesList';

interface ExpensesOutputProps {
    expensesPeriod: string;
    expenses: Expense[];
}

export default function ExpensesOutput({
    expenses,
    expensesPeriod,
}: ExpensesOutputProps) {
    return (
        <View style={styles.container}>
            <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
            <ExpensesList expenses={expenses} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.Colors.primary700,
    },
});
