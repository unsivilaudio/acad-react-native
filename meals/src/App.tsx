import { registerRootComponent } from 'expo';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';

import type { RootDrawerParamsList } from '@/types/root-drawer-params-list';
import type { RootStackParamsList } from '@/types/root-stack-params-list';

import CategoriesScreen from '@/screens/Categories';
import MealsOverviewScreen from '@/screens/MealsOverview';
import MealDetailsScreen from '@/screens/MealDetails';
import FavoriteMealsScreen from '@/screens/FavoriteMeals';
import FavoriteContextProvider from '@/store/context/favorites-context';

registerRootComponent(App);

const Stack = createNativeStackNavigator<RootStackParamsList>();
const Drawer = createDrawerNavigator<RootDrawerParamsList>();

function DrawerNavigator() {
    return (
        <Drawer.Navigator
            screenOptions={{
                headerStyle: { backgroundColor: '#351401' },
                headerTintColor: 'white',
                sceneContainerStyle: { backgroundColor: 'transparent' },
                drawerContentStyle: { backgroundColor: '#351401' },
                drawerActiveTintColor: '#dbadec',
                drawerActiveBackgroundColor: '#4e1c60',
                drawerInactiveTintColor: 'white',
            }}
        >
            <Drawer.Screen
                name='Categories'
                options={{
                    title: 'All Categories',
                    drawerIcon: ({ size, color }) => (
                        <Ionicons name='list' size={size} color={color} />
                    ),
                }}
                component={CategoriesScreen}
            />
            <Drawer.Screen
                name='FavoriteMeals'
                options={{
                    title: 'Favorites',
                    drawerIcon: ({ size, color }) => (
                        <Ionicons name='star' size={size} color={color} />
                    ),
                }}
                component={FavoriteMealsScreen}
            />
        </Drawer.Navigator>
    );
}

export default function App() {
    return (
        <>
            <StatusBar style='light' />
            <FavoriteContextProvider>
                <NavigationContainer>
                    <Stack.Navigator
                        screenOptions={{
                            headerStyle: { backgroundColor: '#351401' },
                            headerTintColor: 'white',
                            contentStyle: { backgroundColor: 'transparent' },
                        }}
                        initialRouteName='Home'
                    >
                        <Stack.Screen
                            name='Home'
                            options={{
                                headerShown: false,
                            }}
                            component={DrawerNavigator}
                        />
                        <Stack.Screen
                            name='MealsOverview'
                            options={{ title: 'Meals Overview' }}
                            component={MealsOverviewScreen}
                        />
                        <Stack.Screen
                            name='MealDetails'
                            options={{
                                title: 'About The Meal',
                            }}
                            component={MealDetailsScreen}
                        />
                    </Stack.Navigator>
                </NavigationContainer>
            </FavoriteContextProvider>
        </>
    );
}
