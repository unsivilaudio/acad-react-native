import { StyleSheet, FlatList, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import type { Place } from '@/models/place';

import { Colors } from '@/constants/styles';
import PlaceListItem from '@/components/places/PlaceListItem';

interface PlaceListProps {
    places: Place[];
}

export default function PlacesList({ places }: PlaceListProps) {
    const navigation = useNavigation();

    function selectPlaceHandler(id: string) {
        navigation.navigate('PlaceDetails', {
            placeId: id,
        });
    }

    if (!places || places.length === 0) {
        return (
            <View style={styles.fallbackContainer}>
                <Text style={styles.fallbackText}>
                    No places added yet -- start adding some!
                </Text>
            </View>
        );
    }

    return (
        <FlatList
            style={styles.list}
            data={places}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
                <PlaceListItem
                    place={item}
                    onSelect={selectPlaceHandler.bind(null, item.id)}
                />
            )}
        />
    );
}

const styles = StyleSheet.create({
    list: {
        margin: 24,
    },
    fallbackContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fallbackText: {
        fontSize: 16,
        color: Colors.primary200,
    },
});
