import { RootBottomTabsParamsList } from '@/types/root-bottom-tabs-params-list';

export type RootStackParamsList = {
    ExpensesOverview: RootBottomTabsParamsList;
    ManageExpense: {
        expenseId?: string;
    };
};
