import { registerRootComponent } from 'expo';
import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { preventAutoHideAsync, hideAsync } from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { RootStackParamsList } from '@/types/root-stack-params-list';

import { Colors } from '@/constants/styles';
import { init } from '@/util/database';

import IconButton from '@/components/ui/IconButton';
import AllPlacesScreen from '@/screens/AllPlaces';
import AddPlaceScreen from '@/screens/AddPlace';
import MapScreen from '@/screens/Map';
import PlaceDetails from '@/screens/PlaceDetails';

registerRootComponent(App);
preventAutoHideAsync();

const Stack = createNativeStackNavigator<RootStackParamsList>();

export default function App() {
    useEffect(() => {
        init().then(async () => {
            await hideAsync();
        });
    }, []);

    return (
        <>
            <StatusBar style='dark' />
            <NavigationContainer>
                <Stack.Navigator
                    screenOptions={{
                        headerStyle: {
                            backgroundColor: Colors.primary500,
                        },
                        headerTintColor: Colors.gray700,
                        contentStyle: {
                            backgroundColor: Colors.gray700,
                        },
                    }}
                >
                    <Stack.Screen
                        name='AllPlaces'
                        component={AllPlacesScreen}
                        options={({ navigation }) => ({
                            title: 'Your Favorite Places',
                            headerRight: ({ tintColor }) => (
                                <IconButton
                                    icon='add'
                                    size={24}
                                    color={tintColor!}
                                    onPress={() =>
                                        navigation.navigate('AddPlace')
                                    }
                                />
                            ),
                        })}
                    />
                    <Stack.Screen
                        name='AddPlace'
                        component={AddPlaceScreen}
                        options={{
                            title: 'Add A New Place',
                        }}
                    />
                    <Stack.Screen name='Map' component={MapScreen} />
                    <Stack.Screen
                        name='PlaceDetails'
                        component={PlaceDetails}
                        options={{
                            title: 'Place Details',
                        }}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
}
