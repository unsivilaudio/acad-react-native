import { View, StyleSheet, Text } from 'react-native';

import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { DrawerScreenProps } from '@react-navigation/drawer';

import type { RootDrawerParamsList } from '@/types/root-drawer-params-list';
import type { RootStackParamsList } from '@/types/root-stack-params-list';

import { MEALS } from '@/data/dummy-data';
import MealList from '@/components/meals/MealList';
import useMealsStore from '@/store/redux/hooks/use-meals';

type FavoriteMealsScreenProps = CompositeScreenProps<
    DrawerScreenProps<RootDrawerParamsList, 'FavoriteMeals'>,
    NativeStackScreenProps<RootStackParamsList>
>;

export default function FavoriteMealsScreen({
    navigation,
}: FavoriteMealsScreenProps) {
    const { favorites } = useMealsStore();

    const favoriteMeals = MEALS.filter((m) => favorites.includes(m.id));

    function selectMealItemHandler(id: string) {
        navigation.navigate('MealDetails', { mealId: id });
    }

    if (favoriteMeals.length <= 0) {
        return (
            <View style={styles.fallbackContainer}>
                <Text style={styles.fallbackText}>
                    Uh oh! You haven't added any favorites yet!
                </Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <MealList meals={favoriteMeals} onSelect={selectMealItemHandler} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 16,
    },
    fallbackContainer: {
        flex: 1,
        margin: 30,
        alignItems: 'center',
        justifyContent: 'center',
    },
    fallbackText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 32,
        textAlign: 'center',
    },
});
