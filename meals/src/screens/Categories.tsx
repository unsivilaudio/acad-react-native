import { View, StyleSheet, FlatList } from 'react-native';

import type { CompositeScreenProps } from '@react-navigation/native';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import type { RootDrawerParamsList } from '@/types/root-drawer-params-list';
import type { RootStackParamsList } from '@/types/root-stack-params-list';

import { CATEGORIES } from '@/data/dummy-data';
import CategoryGridTile from '@/components/categories/CategoryGridTile';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type CategoriesScreenProps = CompositeScreenProps<
    DrawerScreenProps<RootDrawerParamsList, 'Categories'>,
    NativeStackScreenProps<RootStackParamsList>
>;

export default function CategoriesScreen({
    navigation,
}: CategoriesScreenProps) {
    function pressHandler(id: string) {
        navigation.navigate('MealsOverview', {
            categoryId: id,
        });
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={CATEGORIES}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <CategoryGridTile
                        category={item}
                        onPress={pressHandler.bind(null, item.id)}
                    />
                )}
                numColumns={2}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
