import { useLayoutEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamsList } from '@/types/root-stack-params-list';
import type { Expense } from '@/models/expense';

import { GlobalStyles } from '@/constants/styles';
import useExpensesContext from '@/context/hooks/use-expenses';
import { deleteExpense, storeExpense, updateExpense } from '@/util/http';

import LoadingOverlay from '@/components/ui/LoadingOverlay';
import IconButton from '@/components/ui/IconButton';
import ExpenseForm from '@/components/expenses/manage/ExpenseForm';
import ErrorOverlay from '@/components/ui/ErrorOverlay';

type ManageExpenseScreenProps = NativeStackScreenProps<
    RootStackParamsList,
    'ManageExpense'
>;

export default function ManageExpenseScreen({
    navigation,
    route,
}: ManageExpenseScreenProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
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

    async function deleteExpenseHandler() {
        try {
            if (isEditing) {
                setIsSubmitting(true);
                await deleteExpense(route.params.expenseId);
                expenseCtx.deleteExpense(route.params.expenseId);
                navigation.goBack();
            }
        } catch {
            setError('Could not delete expense, please try again later.');
        }
    }

    function cancelHandler() {
        navigation.goBack();
    }

    async function confirmHandler(exp: Omit<Expense, 'id'>) {
        setIsSubmitting(true);
        try {
            if (isEditing) {
                const updatedExpense = await updateExpense({
                    ...exp,
                    id: editingExpense!.id,
                });
                expenseCtx.updateExpense(updatedExpense);
            } else {
                const newExpense = await storeExpense(exp);

                expenseCtx.addExpense(newExpense);
            }
            navigation.goBack();
        } catch {
            setError(
                `Could not ${isEditing ? 'update' : 'add'} expense, please try again later.`,
            );
        }
    }

    function handleClearError() {
        setError(null);
        setIsSubmitting(false);
    }

    if (isSubmitting && error) {
        return <ErrorOverlay message={error} onConfirm={handleClearError} />;
    }

    if (isSubmitting) {
        return <LoadingOverlay />;
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
