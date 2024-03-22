import { getDateMinusDays } from '@/util/date';
import useExpensesContext from '@/context/hooks/use-expenses';

import ExpensesOutput from '@/components/expenses/ExpensesOutput';
import LoadingOverlay from '@/components/ui/LoadingOverlay';
import ErrorOverlay from '@/components/ui/ErrorOverlay';

export default function RecentExpensesScreen() {
    const { expenses, isLoading, clearError, error } = useExpensesContext();

    if (isLoading) {
        return <LoadingOverlay />;
    }

    if (!isLoading && error) {
        return <ErrorOverlay message={error} onConfirm={clearError} />;
    }

    const recentExpenses = expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);

        return expense.date >= date7DaysAgo && expense.date <= today;
    });
    return (
        <ExpensesOutput
            expenses={recentExpenses}
            expensesPeriod='Last 7 Days'
        />
    );
}
