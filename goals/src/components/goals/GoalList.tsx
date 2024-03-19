import { Text, View, StyleSheet, FlatList } from 'react-native';

import Goal from '@/models/goal';
import GoalListItem from '@/components/goals/GoalListItem';

interface GoalListProps {
    goals: Goal[];
    onDeleteGoal: (id: string) => void;
}

export default function GoalList({ goals, onDeleteGoal }: GoalListProps) {
    return (
        <View style={styles.container}>
            {goals.length ? (
                <FlatList
                    data={goals}
                    keyExtractor={(item: Goal) => item.id}
                    renderItem={({ item }) => (
                        <GoalListItem
                            text={item.text}
                            onDeleteGoal={onDeleteGoal.bind(null, item.id)}
                        />
                    )}
                />
            ) : (
                <View style={styles.fallbackContainer}>
                    <Text style={styles.fallbackText}>
                        No goals added yet. Try adding a new Goal.
                    </Text>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingBottom: 16,
    },
    fallbackContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    fallbackText: {
        fontSize: 24,
        textAlign: 'center',
    },
});
