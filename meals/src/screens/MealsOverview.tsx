import { useLayoutEffect } from 'react';
import { View, StyleSheet } from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamsList } from '@/types/root-stack-params-list';

import { CATEGORIES, MEALS } from '@/data/dummy-data';
import MealList from '@/components/meals/MealList';

type MealsOverviewScreenProps = NativeStackScreenProps<
    RootStackParamsList,
    'MealsOverview'
>;

export default function MealsOverviewScreen({
    route,
    navigation,
}: MealsOverviewScreenProps) {
    const catId = route.params.categoryId;

    useLayoutEffect(() => {
        const categoryTitle = CATEGORIES.find((cat) => cat.id === catId)!.title;

        navigation.setOptions({
            title: categoryTitle,
        });
    }, [catId, navigation]);

    const displayedMeals = MEALS.filter((mealItem) => {
        return mealItem.categoryIds.indexOf(catId) >= 0;
    });

    function selectMealItemHandler(id: string) {
        navigation.navigate('MealDetails', { mealId: id });
    }

    return (
        <View style={styles.container}>
            <MealList meals={displayedMeals} onSelect={selectMealItemHandler} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        // backgroundColor: '#ececec',
    },
});
