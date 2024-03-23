import { useCallback, useMemo, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useRoute, type RouteProp } from '@react-navigation/native';

import type { RootStackParamsList } from '@/types/root-stack-params-list';
import type { Place } from '@/models/place';

import { Colors } from '@/constants/styles';
import LocationPicker, {
    type PickedLocation,
} from '@/components/places/LocationPicker';
import ImagePicker from '@/components/places/ImagePicker';
import Button from '@/components/ui/Button';

interface PlaceFormProps {
    onCreatePlace(place: Omit<Place, 'id'>): void;
}

type PlaceFormRouteProps = RouteProp<RootStackParamsList, 'AddPlace'>;

export default function PlaceForm({ onCreatePlace }: PlaceFormProps) {
    const route = useRoute<PlaceFormRouteProps>();
    const [enteredTitle, setEnteredTitle] = useState('');
    const [selectedImage, setSelectedImage] = useState('');
    const [pickedLocation, setPickedLocation] = useState<PickedLocation>();

    function changeTitleHandler(value: string) {
        setEnteredTitle(value);
    }

    function takeImageHandler(imageUri: string) {
        setSelectedImage(imageUri);
    }

    const pickLocationHandler = useCallback((location: PickedLocation) => {
        setPickedLocation(location);
    }, []);

    function savePlaceHandler() {
        if (
            !enteredTitle ||
            !selectedImage ||
            !pickedLocation ||
            !pickedLocation.address
        ) {
            return;
        }
        const placeData: Omit<Place, 'id'> = {
            title: enteredTitle,
            imageUri: selectedImage,
            address: pickedLocation.address,
            location: {
                lat: pickedLocation.lat,
                lng: pickedLocation.lng,
            },
        };
        onCreatePlace(placeData);
    }

    const routePickedLocation = useMemo(() => {
        return route.params &&
            Object.keys(route.params).every(key =>
                ['pickedLat', 'pickedLng'].includes(key)
            )
            ? {
                  lat: route.params.pickedLat,
                  lng: route.params.pickedLng,
              }
            : undefined;
    }, [route]);

    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={changeTitleHandler}
                    value={enteredTitle}
                />
            </View>
            <ImagePicker onTakeImage={takeImageHandler} />
            <LocationPicker
                onPickLocation={pickLocationHandler}
                initialLocation={routePickedLocation}
            />
            <Button onPress={savePlaceHandler}>Add Place</Button>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 24,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 4,
        color: Colors.primary700,
    },
    input: {
        marginVertical: 8,
        paddingHorizontal: 4,
        paddingVertical: 8,
        fontSize: 16,
        borderBottomColor: Colors.primary700,
        borderBottomWidth: 2,
        backgroundColor: Colors.primary100,
    },
});
