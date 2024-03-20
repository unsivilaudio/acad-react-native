import {
    View,
    Text,
    StyleSheet,
    Pressable,
    Image,
    Platform,
} from 'react-native';

import type Meal from '@/models/meal';
import MealDetails from '@/components/meals/MealDetails';

interface MealItemProps {
    onPress: () => void;
    meal: Meal;
}

export default function MealItem({ meal, onPress }: MealItemProps) {
    return (
        <View style={styles.container}>
            <Pressable
                onPress={onPress}
                android_ripple={{ color: '#ccc' }}
                style={({ pressed }) => pressed && { opacity: 0.7 }}
            >
                <View style={{ borderRadius: 8, overflow: 'hidden' }}>
                    <View>
                        <Image
                            source={{
                                uri: meal.imageUrl,
                            }}
                            style={styles.image}
                        />
                        <Text style={styles.title}>{meal.title}</Text>
                    </View>
                    <MealDetails
                        duration={meal.duration}
                        complexity={meal.complexity}
                        affordability={meal.affordability}
                    />
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 16,
        borderRadius: 8,
        backgroundColor: 'white',
        elevation: 4,
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 16,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },
    image: {
        width: '100%',
        height: 200,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        textAlign: 'center',
        margin: 8,
    },
});
