import { DUMMY_EXPENSES } from '@/models/mock/dummy-data';
import ExpensesOutput from '@/components/expenses/ExpensesOutput';

export default function AllExpensesScreen() {
    return <ExpensesOutput expenses={DUMMY_EXPENSES} expensesPeriod='Total' />;
}
