import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import type { RootStackParamsList } from '@/types/root-stack-params-list';
import type { RootBottomTabsParamsList } from '@/types/root-bottom-tabs-params-list';

import { GlobalStyles } from '@/constants/styles';
import ManageExpenseScreen from '@/screens/ManageExpense';
import AllExpensesScreen from '@/screens/AllExpenses';
import RecentExpensesScreen from '@/screens/RecentExpenses';
import IconButton from '@/components/ui/IconButton';

registerRootComponent(App);

const Stack = createNativeStackNavigator<RootStackParamsList>();
const BottomTabs = createBottomTabNavigator<RootBottomTabsParamsList>();

function ExpensesOverview() {
    return (
        <BottomTabs.Navigator
            screenOptions={({ navigation }) => ({
                headerStyle: {
                    backgroundColor: GlobalStyles.Colors.primary500,
                },
                headerTintColor: 'white',
                tabBarStyle: {
                    backgroundColor: GlobalStyles.Colors.primary500,
                    paddingBottom: 5,
                },
                tabBarActiveTintColor: GlobalStyles.Colors.accent500,
                headerRight: ({ tintColor }) => (
                    <IconButton
                        color={tintColor!}
                        size={24}
                        name='add'
                        onPress={() => navigation.navigate('ManageExpense')}
                    />
                ),
            })}
        >
            <BottomTabs.Screen
                name='AllExpenses'
                options={{
                    title: 'All Expenses',
                    tabBarLabel: 'All Expenses',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons color={color} size={size} name='calendar' />
                    ),
                }}
                component={AllExpensesScreen}
            />
            <BottomTabs.Screen
                name='RecentExpenses'
                options={{
                    title: 'Recent Expenses',
                    tabBarLabel: 'Recent',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons color={color} size={size} name='hourglass' />
                    ),
                }}
                component={RecentExpensesScreen}
            />
        </BottomTabs.Navigator>
    );
}

export default function App() {
    return (
        <>
            <StatusBar style='auto' />
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: GlobalStyles.Colors.primary500,
                        },
                        headerTintColor: 'white',
                    }}
                >
                    <Stack.Screen
                        name='ExpensesOverview'
                        component={ExpensesOverview}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name='ManageExpense'
                        component={ManageExpenseScreen}
                        options={{
                            title: 'Manage Expense',
                            presentation: 'modal',
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
