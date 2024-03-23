import { useCallback, useLayoutEffect, useState, useMemo } from 'react';
import { Alert, StyleSheet } from 'react-native';
import MapView, {
    type MapPressEvent,
    type Region,
    Marker,
} from 'react-native-maps';

import type { RootStackParamsList } from '@/types/root-stack-params-list';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import IconButton from '@/components/ui/IconButton';

type SelectedLocation = {
    lat: number;
    lng: number;
};

type MapScreenProps = NativeStackScreenProps<RootStackParamsList, 'Map'>;

export default function MapScreen({ navigation, route }: MapScreenProps) {
    const initialLocation = useMemo(
        () =>
            route.params
                ? {
                      lat: route.params.initialLat,
                      lng: route.params.initialLng,
                  }
                : undefined,
        [route]
    );
    const [selectedLocation, setSelectedLocation] = useState<SelectedLocation>(
        initialLocation!
    );

    const region: Region = {
        latitude: initialLocation?.lat ?? 37.78,
        longitude: initialLocation?.lng ?? -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    };

    function selectLocationHandler(event: MapPressEvent) {
        const lat = event.nativeEvent.coordinate.latitude;
        const lng = event.nativeEvent.coordinate.longitude;
        setSelectedLocation({ lat, lng });
    }

    const savePickedLocationHandler = useCallback(() => {
        if (!selectedLocation) {
            Alert.alert(
                'No location picked!',
                'You have to pick a location (by tapping on the map) first!'
            );
            return;
        }

        navigation.navigate('AddPlace', {
            pickedLat: selectedLocation.lat,
            pickedLng: selectedLocation.lng,
        });
    }, [selectedLocation, navigation]);

    useLayoutEffect(() => {
        if (initialLocation) return;
        navigation.setOptions({
            headerRight: ({ tintColor }) => (
                <IconButton
                    color={tintColor!}
                    icon='save'
                    size={24}
                    onPress={savePickedLocationHandler}
                />
            ),
        });
    }, [navigation, initialLocation, savePickedLocationHandler]);

    return (
        <MapView
            initialRegion={region}
            style={styles.map}
            onPress={initialLocation ? undefined : selectLocationHandler}
            scrollEnabled={!initialLocation}
            zoomEnabled={!initialLocation}
        >
            {selectedLocation && (
                <Marker
                    title='Picked Location'
                    coordinate={{
                        latitude: selectedLocation.lat,
                        longitude: selectedLocation.lng,
                    }}
                />
            )}
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
});
