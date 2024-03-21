import { useCallback, useLayoutEffect } from 'react';
import { Image, ScrollView, View, Text, StyleSheet } from 'react-native';

import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamsList } from '@/types/root-stack-params-list';

import { MEALS } from '@/data/dummy-data';
import useMealsStore from '@/store/redux/hooks/use-meals';

import MealDetails from '@/components/meals/MealDetails';
import Subtitle from '@/components/meals/detail/Subtitle';
import List from '@/components/meals/detail/List';
import IconButton from '@/components/ui/IconButton';

type MealDetailsScreenProps = NativeStackScreenProps<
    RootStackParamsList,
    'MealDetails'
>;

export default function MealDetailsScreen({
    route,
    navigation,
}: MealDetailsScreenProps) {
    const { mealId } = route.params;
    const { favorites, addFavorite, removeFavorite } = useMealsStore();
    const meal = MEALS.find((m) => m.id === mealId);
    const mealIsFavorite = favorites.includes(mealId);

    const toggleMealFavorite = useCallback(() => {
        if (mealIsFavorite) {
            removeFavorite({ id: mealId });
            return;
        }

        addFavorite({ id: mealId });
    }, [mealId, mealIsFavorite, addFavorite, removeFavorite]);

    useLayoutEffect(() => {
        if (!meal?.id) return;
        navigation.setOptions({
            headerRight: () => (
                <IconButton
                    color='white'
                    icon={mealIsFavorite ? 'star' : 'star-outline'}
                    onPress={toggleMealFavorite}
                />
            ),
        });
    }, [navigation, meal, mealIsFavorite, toggleMealFavorite]);

    if (!meal) {
        return (
            <View style={styles.container}>
                <Text>No meal found with that id.</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Image
                source={{
                    uri: meal.imageUrl,
                }}
                style={styles.image}
            />
            <Text style={styles.title}>{meal.title}</Text>
            <MealDetails
                textStyle={styles.detailText}
                duration={meal.duration}
                complexity={meal.complexity}
                affordability={meal.affordability}
            />
            <View style={{ flex: 1, alignItems: 'center', paddingBottom: 40 }}>
                <View style={styles.listContainer}>
                    <Subtitle>Ingredients</Subtitle>
                    <List data={meal.ingredients} />
                    <Subtitle>Steps</Subtitle>
                    <List data={meal.steps} />
                </View>
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        color: 'white',
    },
    image: {
        width: '100%',
        height: 300,
        objectFit: 'cover',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        margin: 8,
        textAlign: 'center',
        color: 'white',
    },
    detailText: {
        color: '#e2b497',
    },
    listContainer: {
        width: '80%',
    },
});
