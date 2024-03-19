import { Text, View, StyleSheet, Pressable } from 'react-native';

interface GoalListItemProps {
    text: string;
    onDeleteGoal: () => void;
}

export default function GoalListItem({
    text,
    onDeleteGoal,
}: GoalListItemProps) {
    return (
        <Pressable style={styles.container} onPress={onDeleteGoal}>
            <Text style={styles.goalText}>{text}</Text>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 8,
        borderRadius: 6,
        marginTop: 12,
        backgroundColor: '#5e0acc',
    },
    goalText: {
        fontSize: 16,
        color: 'white',
    },
});
