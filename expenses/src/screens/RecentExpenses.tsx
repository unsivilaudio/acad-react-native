import ExpensesOutput from '@/components/expenses/ExpensesOutput';
import { DUMMY_EXPENSES } from '@/models/mock/dummy-data';

const last7 = 84600 * 7 * 1000;

export default function RecentExpensesScreen() {
    const recentExpenses = DUMMY_EXPENSES.filter(
        (exp) => exp.date.getTime() > Date.now() - last7,
    );
    return (
        <ExpensesOutput
            expenses={recentExpenses}
            expensesPeriod='Last 7 Days'
        />
    );
}
