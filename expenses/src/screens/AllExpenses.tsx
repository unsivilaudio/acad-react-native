import ExpensesOutput from '@/components/expenses/ExpensesOutput';
import useExpensesContext from '@/context/hooks/use-expenses';

export default function AllExpensesScreen() {
    const expenseCtx = useExpensesContext();
    return (
        <ExpensesOutput expenses={expenseCtx.expenses} expensesPeriod='Total' />
    );
}
