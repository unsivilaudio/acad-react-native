import { registerRootComponent } from 'expo';
import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import type { RootStackParamsList } from '@/types/root-stack-params-list';
import type { ProtectedStackParamsList } from '@/types/protected-stack-params-list';

import { Colors } from '@/constants/styles';

import { useAuthContext } from '@/store/hooks/use-auth-ctx';
import AuthContextProvider from '@/store/context/auth-context';
import LoginScreen from '@/screens/Login';
import SignupScreen from '@/screens/Signup';
import WelcomeScreen from '@/screens/Welcome';
import IconButton from '@/components/ui/IconButton';

registerRootComponent(App);
preventAutoHideAsync();

const Stack = createNativeStackNavigator<RootStackParamsList>();
const ProtectedStack = createNativeStackNavigator<ProtectedStackParamsList>();

function AuthStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: Colors.primary500 },
                headerTintColor: 'white',
                contentStyle: { backgroundColor: Colors.primary100 },
            }}
        >
            <Stack.Screen name='Login' component={LoginScreen} />
            <Stack.Screen name='Signup' component={SignupScreen} />
        </Stack.Navigator>
    );
}

function AuthenticatedStack() {
    const authCtx = useAuthContext();
    return (
        <ProtectedStack.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: Colors.primary500 },
                headerTintColor: 'white',
                contentStyle: { backgroundColor: Colors.primary100 },
            }}
        >
            <ProtectedStack.Screen
                name='Welcome'
                component={WelcomeScreen}
                options={{
                    headerRight: () => (
                        <IconButton
                            icon='exit'
                            color='white'
                            size={24}
                            onPress={authCtx.logout}
                        />
                    ),
                }}
            />
        </ProtectedStack.Navigator>
    );
}

function Root() {
    const { isAuthenticated, authenticate } = useAuthContext();

    useEffect(() => {
        async function fetchStorageToken() {
            const token = await AsyncStorage.getItem('token');
            if (token) {
                await authenticate(token);
            }
            await hideAsync();
        }

        fetchStorageToken();
    }, [authenticate]);

    return (
        <NavigationContainer>
            {!isAuthenticated ? <AuthStack /> : <AuthenticatedStack />}
        </NavigationContainer>
    );
}

export default function App() {
    return (
        <>
            <StatusBar style='light' />
            <AuthContextProvider>
                <Root />
            </AuthContextProvider>
        </>
    );
}
