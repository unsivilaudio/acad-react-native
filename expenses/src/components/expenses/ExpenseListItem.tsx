import { Pressable, View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import type { Expense } from '@/models/expense';
import { GlobalStyles } from '@/constants/styles';
import { getFormattedDate } from '@/util/date';

// HIGHLY DISCOURAGED USAGE -- {niche case only}
// ==============================================
// see types/globals.d.ts for proper solution
//
// type NestedStackNavigation = CompositeNavigationProp<
//     BottomTabNavigationProp<
//         RootBottomTabsParamsList,
//         'AllExpenses' | 'RecentExpenses'
//     >,
//     NativeStackNavigationProp<RootStackParamsList>
// >;

type ExpenseItemProps = {
    expense: Expense;
};

export default function ExpenseListItem({ expense }: ExpenseItemProps) {
    const navigation = useNavigation();
    const readableDate = getFormattedDate(expense.date);

    function expensePressHandler() {
        navigation.navigate('ManageExpense', { expenseId: expense.id });
    }

    return (
        <Pressable
            onPress={expensePressHandler}
            style={({ pressed }) => pressed && styles.pressed}
        >
            <View style={styles.container}>
                <View>
                    <Text style={[styles.textBase, styles.description]}>
                        {expense.description}
                    </Text>
                    <Text style={styles.textBase}>{readableDate}</Text>
                </View>
                <View style={styles.amountContainer}>
                    <Text style={[styles.textBase, styles.amount]}>
                        {expense.amount.toFixed(2)}
                    </Text>
                </View>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        marginVertical: 8,
        backgroundColor: GlobalStyles.Colors.primary500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 6,
        elevation: 3,
        shadowColor: GlobalStyles.Colors.gray500,
        shadowRadius: 4,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
    },
    pressed: {
        opacity: 0.5,
    },
    textBase: {
        color: GlobalStyles.Colors.primary50,
    },
    description: {
        fontSize: 16,
        marginBottom: 4,
        fontWeight: 'bold',
    },
    amountContainer: {
        paddingHorizontal: 12,
        paddingVertical: 4,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 4,
    },
    amount: {
        color: GlobalStyles.Colors.primary500,
        fontWeight: 'bold',
    },
});
