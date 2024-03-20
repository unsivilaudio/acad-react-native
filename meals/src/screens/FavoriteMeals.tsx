import { View, Text, StyleSheet } from 'react-native';

import type { CompositeScreenProps } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import type { RootDrawerParamsList } from '@/types/root-drawer-params-list';
import type { RootStackParamsList } from '@/types/root-stack-params-list';

type FavoriteMealsScreenProps = CompositeScreenProps<
    DrawerScreenProps<RootDrawerParamsList, 'FavoriteMeals'>,
    NativeStackScreenProps<RootStackParamsList>
>;

export default function FavoriteMealsScreen({
    navigation,
}: FavoriteMealsScreenProps) {
    return (
        <View>
            <Text>The FavoriteMeals component</Text>
        </View>
    );
}

const styles = StyleSheet.create({});
