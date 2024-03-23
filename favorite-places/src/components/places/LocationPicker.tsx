import { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
    getCurrentPositionAsync,
    useForegroundPermissions,
    PermissionStatus,
} from 'expo-location';

import { Colors } from '@/constants/styles';
import { getAddress, getMapPreview } from '@/util/location';

import OutlinedButton from '@/components/ui/OutlinedButton';

export type PickedLocation = {
    lat: number;
    lng: number;
    address: string;
};

interface LocationPickerProps {
    initialLocation?: Omit<PickedLocation, 'address'>;
    onPickLocation(location: PickedLocation): void;
}

export default function LocationPicker({
    onPickLocation,
    initialLocation,
}: LocationPickerProps) {
    const navigation = useNavigation();
    const [pickedLocation, setPickedLocation] =
        useState<Omit<PickedLocation, 'address'>>();
    const [locationsPermission, requestPermission] = useForegroundPermissions();

    useEffect(() => {
        if (initialLocation) {
            setPickedLocation(initialLocation);
        }
    }, [initialLocation]);

    useEffect(() => {
        async function handleLocation() {
            if (pickedLocation) {
                const address = await getAddress(
                    pickedLocation.lat,
                    pickedLocation.lng
                );
                onPickLocation({ ...pickedLocation, address });
            }
        }

        handleLocation();
    }, [pickedLocation, onPickLocation]);

    async function verifyPermissions() {
        if (locationsPermission?.status === PermissionStatus.UNDETERMINED) {
            const permissionResponse = await requestPermission();

            return permissionResponse.granted;
        }

        if (locationsPermission?.status === PermissionStatus.DENIED) {
            Alert.alert(
                'Insufficient Permissions',
                'You need to grant location permissions to use this app.'
            );
            return false;
        }

        return true;
    }

    async function getLocationHandler() {
        const hasPermission = await verifyPermissions();

        if (!hasPermission) {
            return;
        }

        const location = await getCurrentPositionAsync();
        setPickedLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        });
    }

    function pickOnMapHandler() {
        navigation.navigate('Map');
    }

    let mapPreview = <Text>No location picked yet.</Text>;

    if (pickedLocation) {
        mapPreview = (
            <Image
                style={styles.image}
                source={{
                    uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
                }}
            />
        );
    }

    return (
        <View>
            <View style={styles.mapPreview}>{mapPreview}</View>
            <View style={styles.actions}>
                <OutlinedButton icon='location' onPress={getLocationHandler}>
                    Locate User
                </OutlinedButton>
                <OutlinedButton icon='map' onPress={pickOnMapHandler}>
                    Pick on Map
                </OutlinedButton>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 200,
        marginVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.primary100,
        borderRadius: 4,
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 4,
    },
});
