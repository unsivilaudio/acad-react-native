import { useEffect, useState } from 'react';
import {
    ScrollView,
    View,
    Text,
    StyleSheet,
    Image,
    ActivityIndicator,
} from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamsList } from '@/types/root-stack-params-list';
import type { Place } from '@/models/place';

import { Colors } from '@/constants/styles';
import { fetchPlaceDetails } from '@/util/database';
import OutlinedButton from '@/components/ui/OutlinedButton';

type PlaceDetailsScreenProps = NativeStackScreenProps<
    RootStackParamsList,
    'PlaceDetails'
>;

export default function PlaceDetails({
    route,
    navigation,
}: PlaceDetailsScreenProps) {
    const [loadedPlace, setLoadedPlace] = useState<Place>();

    function showOnMapHandler() {
        if (!loadedPlace) return;

        navigation.navigate('Map', {
            initialLat: loadedPlace.location.lat,
            initialLng: loadedPlace.location.lng,
        });
    }

    const selectedPlaceId = route.params.placeId;

    useEffect(() => {
        async function loadPlaceData() {
            if (!selectedPlaceId) return;
            const place = await fetchPlaceDetails(selectedPlaceId);
            setLoadedPlace(place);
            navigation.setOptions({
                title: place.title,
            });
        }

        loadPlaceData();
    }, [selectedPlaceId, navigation]);

    if (!loadedPlace) {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <ScrollView>
            <Image
                style={styles.image}
                source={{ uri: loadedPlace.imageUri }}
            />
            <View style={styles.locationContainer}>
                <View style={styles.addressContainer}>
                    <Text style={styles.address}>{loadedPlace.address}</Text>
                </View>
                <OutlinedButton icon='map' onPress={showOnMapHandler}>
                    View on Map
                </OutlinedButton>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    image: {
        height: '35%',
        minHeight: 300,
        width: '100%',
    },
    locationContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    addressContainer: {
        padding: 20,
    },
    address: {
        color: Colors.primary500,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
