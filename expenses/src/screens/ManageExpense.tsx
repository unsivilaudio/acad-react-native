import { useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamsList } from '@/types/root-stack-params-list';
import type { Expense } from '@/models/expense';

import { GlobalStyles } from '@/constants/styles';
import useExpensesContext from '@/context/hooks/use-expenses';

import IconButton from '@/components/ui/IconButton';
import ExpenseForm from '@/components/expenses/manage/ExpenseForm';

type ManageExpenseScreenProps = NativeStackScreenProps<
    RootStackParamsList,
    'ManageExpense'
>;

export default function ManageExpenseScreen({
    navigation,
    route,
}: ManageExpenseScreenProps) {
    const expenseCtx = useExpensesContext();

    const isEditing = !!route.params?.expenseId;
    const editingExpense = isEditing
        ? expenseCtx.expenses.find((e) => e.id === route.params.expenseId)
        : null;

    useLayoutEffect(() => {
        const title = isEditing ? 'Edit Expense' : 'Add Expense';
        navigation.setOptions({
            title,
        });
    }, [navigation, isEditing]);

    function deleteExpenseHandler() {
        if (isEditing) {
            expenseCtx.deleteExpense(route.params.expenseId);
        }
        navigation.goBack();
    }

    function cancelHandler() {
        navigation.goBack();
    }

    function confirmHandler(exp: Omit<Expense, 'id'>) {
        if (isEditing) {
            expenseCtx.updateExpense({
                ...exp,
                id: editingExpense!.id,
            });
        } else {
            expenseCtx.addExpense(exp);
        }
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            <ExpenseForm
                onSubmit={confirmHandler}
                onCancel={cancelHandler}
                submitButtonLabel={isEditing ? 'Update' : 'Add'}
                initialState={editingExpense || undefined}
            />
            {isEditing && (
                <View style={styles.deleteContainer}>
                    <IconButton
                        name='trash'
                        color={GlobalStyles.Colors.error500}
                        size={36}
                        onPress={deleteExpenseHandler}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        backgroundColor: GlobalStyles.Colors.primary800,
    },

    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.Colors.primary200,
        alignItems: 'center',
    },
});
