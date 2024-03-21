import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { RootStackParamsList } from './types/root-stack-params-list';
import ManageExpenseScreen from './screens/ManageExpense';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootTabsParamsList } from './types/root-tabs-params-list';
import AllExpensesScreen from './screens/AllExpenses';
import RecentExpensesScreen from './screens/RecentExpenses';
import { NavigationContainer } from '@react-navigation/native';

registerRootComponent(App);

const Stack = createNativeStackNavigator<RootStackParamsList>();
const Tabs = createBottomTabNavigator<RootTabsParamsList>();

function TabNavigator() {
    return (
        <Tabs.Navigator>
            <Tabs.Screen name='AllExpense' component={AllExpensesScreen} />
            <Tabs.Screen
                name='RecentExpense'
                component={RecentExpensesScreen}
            />
        </Tabs.Navigator>
    );
}

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen
                    name='Home'
                    component={TabNavigator}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name='ManageExpense'
                    component={ManageExpenseScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
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
