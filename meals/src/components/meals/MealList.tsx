import { FlatList } from 'react-native';

import type Meal from '@/models/meal';
import MealItem from '@/components/meals/MealItem';

interface MealListProps {
    meals: Meal[];
    onSelect: (id: string) => void;
}

export default function MealList({ meals, onSelect }: MealListProps) {
    return (
        <FlatList
            data={meals}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <MealItem meal={item} onPress={onSelect.bind(null, item.id)} />
            )}
        />
    );
}
