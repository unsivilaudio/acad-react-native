import { useEffect, useState } from 'react';
import { useIsFocused } from '@react-navigation/native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamsList } from '@/types/root-stack-params-list';
import type { Place } from '@/models/place';

import { fetchPlaces } from '@/util/database';
import PlacesList from '@/components/places/PlacesList';

type AllPlacesScreenProps = NativeStackScreenProps<
    RootStackParamsList,
    'AllPlaces'
>;

export default function AllPlacesScreen({ route }: AllPlacesScreenProps) {
    const [loadedPlaces, setLoadedPlaces] = useState<Place[]>([]);
    const isFocused = useIsFocused();

    useEffect(() => {
        async function loadPlaces() {
            const result = await fetchPlaces();
            setLoadedPlaces(result);
        }

        if (isFocused) {
            loadPlaces();
        }
    }, [isFocused]);

    return <PlacesList places={loadedPlaces} />;
}
