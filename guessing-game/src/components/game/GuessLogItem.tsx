import { Colors } from '@/constants/colors';
import { View, Text, StyleSheet } from 'react-native';

interface GuessLogItemProps {
    roundNumber: number;
    guess: number;
}

export default function GuessLogItem({
    roundNumber,
    guess,
}: GuessLogItemProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.itemText}>#{roundNumber}</Text>
            <Text style={styles.itemText}>Opponent's Guess: {guess}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        borderColor: Colors.primary800,
        borderWidth: 1,
        borderRadius: 40,
        padding: 12,
        marginVertical: 8,
        backgroundColor: Colors.accent500,
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        elevation: 4,
    },
    itemText: {
        fontFamily: 'open-sans',
    },
});
