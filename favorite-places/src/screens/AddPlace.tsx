import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamsList } from '@/types/root-stack-params-list';
import type { Place } from '@/models/place';

import { insertPlace } from '@/util/database';
import PlaceForm from '@/components/places/PlaceForm';

type AddPlaceScreenProps = NativeStackScreenProps<
    RootStackParamsList,
    'AddPlace'
>;

export default function AddPlaceScreen({ navigation }: AddPlaceScreenProps) {
    async function createPlaceHandler(place: Omit<Place, 'id'>) {
        await insertPlace(place);
        navigation.navigate('AllPlaces');
    }

    return <PlaceForm onCreatePlace={createPlaceHandler} />;
}
