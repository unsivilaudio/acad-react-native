import type Category from '@/models/category';
import { View, Pressable, Text, StyleSheet, Platform } from 'react-native';

interface CategoryGridTileProps {
    onPress: () => void;
    category: Category;
}

export default function CategoryGridTile({
    category,
    onPress,
}: CategoryGridTileProps) {
    const { title, color } = category;
    return (
        <View style={styles.gridItem}>
            <Pressable
                onPress={onPress}
                android_ripple={{ color: '#ccc' }}
                style={({ pressed }) =>
                    Platform.OS === 'android'
                        ? [styles.button, { backgroundColor: color }]
                        : [
                              styles.button,
                              { backgroundColor: color },
                              pressed && styles.buttonPressed,
                          ]
                }
            >
                <View style={styles.innerContainer}>
                    <Text style={styles.title}>{title}</Text>
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    gridItem: {
        flex: 1,
        margin: 16,
        height: 150,
        borderRadius: 8,
        elevation: 4,
        backgroundColor: 'white',
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 8,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },
    button: {
        flex: 1,
    },
    buttonPressed: {
        opacity: 0.7,
    },
    innerContainer: {
        flex: 1,
        padding: 16,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
    },
});
