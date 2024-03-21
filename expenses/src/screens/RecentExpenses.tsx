import { getDateMinusDays } from '@/util/date';
import useExpensesContext from '@/context/hooks/use-expenses';

import ExpensesOutput from '@/components/expenses/ExpensesOutput';

export default function RecentExpensesScreen() {
    const expensesCtx = useExpensesContext();

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
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
