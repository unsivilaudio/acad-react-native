import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { RootStackParamsList } from '@/type/root-stack-params-list';

import { Colors } from '@/constants/styles';

import LoginScreen from '@/screens/Login';
import SignupScreen from '@/screens/Signup';
import WelcomeScreen from '@/screens/Welcome';

registerRootComponent(App);

const RootStack = createNativeStackNavigator<RootStackParamsList>();
const Stack = createNativeStackNavigator();

function AuthStack() {
    return (
        <RootStack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: Colors.primary500 },
                headerTintColor: 'white',
                contentStyle: { backgroundColor: Colors.primary100 },
            }}
        >
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Signup' component={SignupScreen} />
        </RootStack.Navigator>
    );
}

function AuthenticatedStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: Colors.primary500 },
                headerTintColor: 'white',
                contentStyle: { backgroundColor: Colors.primary100 },
            }}
        >
            <Stack.Screen name='Welcome' component={WelcomeScreen} />
        </Stack.Navigator>
    );
}

function Navigation() {
    return (
        <NavigationContainer>
            <AuthStack />
        </NavigationContainer>
    );
}

export default function App() {
    return (
        <>
            <StatusBar style='light' />
            <Navigation />
        </>
    );
}
