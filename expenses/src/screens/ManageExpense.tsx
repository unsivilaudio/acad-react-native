import { useLayoutEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamsList } from '@/types/root-stack-params-list';
import IconButton from '@/components/ui/IconButton';
import { GlobalStyles } from '@/constants/styles';
import Button from '@/components/ui/Button';

type ManageExpenseScreenProps = NativeStackScreenProps<
    RootStackParamsList,
    'ManageExpense'
>;

export default function ManageExpenseScreen({
    navigation,
    route,
}: ManageExpenseScreenProps) {
    const isEditing = !!route.params?.expenseId;
    const title = isEditing ? 'Edit Expense' : 'Add Expense';

    useLayoutEffect(() => {
        navigation.setOptions({
            title,
        });
    }, [title, navigation]);

    function deleteExpenseHandler() {}

    function cancelHandler() {
        navigation.goBack();
    }

    function confirmHandler() {}

    return (
        <View style={styles.container}>
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
