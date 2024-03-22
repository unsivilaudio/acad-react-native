import ExpensesOutput from '@/components/expenses/ExpensesOutput';
import ErrorOverlay from '@/components/ui/ErrorOverlay';
import LoadingOverlay from '@/components/ui/LoadingOverlay';
import useExpensesContext from '@/context/hooks/use-expenses';

export default function AllExpensesScreen() {
    const { expenses, isLoading, clearError, error } = useExpensesContext();

    if (isLoading) {
        return <LoadingOverlay />;
    }

    if (!isLoading && error) {
        return <ErrorOverlay message={error} onConfirm={clearError} />;
    }

    return <ExpensesOutput expenses={expenses} expensesPeriod='Total' />;
}
