import useExpensesContext from '@/context/hooks/use-expenses';
import ExpensesOutput from '@/components/expenses/ExpensesOutput';

const last7 = 84600 * 7 * 1000;

export default function RecentExpensesScreen() {
    const expenseCtx = useExpensesContext();
    const recentExpenses = expenseCtx.expenses.filter(
        (exp) => exp.date.getTime() > Date.now() - last7,
    );
    return (
        <ExpensesOutput
            expenses={recentExpenses}
            expensesPeriod='Last 7 Days'
        />
    );
}
