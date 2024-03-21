import { useLayoutEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import type { RootStackParamsList } from '@/types/root-stack-params-list';

import { GlobalStyles } from '@/constants/styles';
import IconButton from '@/components/ui/IconButton';
import Button from '@/components/ui/Button';
import useExpensesContext from '@/context/hooks/use-expenses';

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

    function confirmHandler() {
        if (isEditing) {
            // @TODO
        } else {
            // @DO SOMETHING ELSE
        }
        navigation.goBack();
    }

    return (
        <View style={styles.container}>
            {editingExpense && <Text>{editingExpense.description}</Text>}
            <View style={styles.buttonsContainer}>
                <Button
                    mode='flat'
                    viewStyle={styles.button}
                    onPress={cancelHandler}
                >
                    Cancel
                </Button>
                <Button viewStyle={styles.button} onPress={confirmHandler}>
                    {isEditing ? 'Update' : 'Add'}
                </Button>
            </View>
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
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
    deleteContainer: {
        marginTop: 16,
        paddingTop: 8,
        borderTopWidth: 2,
        borderTopColor: GlobalStyles.Colors.primary200,
        alignItems: 'center',
    },
});
