import { useState, useMemo, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, FlatList } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { generateRandomBetween } from '@/util/numbers';
import Title from '@/components/ui/Title';
import Card from '@/components/ui/Card';
import NumberContainer from '@/components/game/NumberContainer';
import PrimaryButton from '@/components/ui/PrimaryButton';
import InstructionText from '@/components/ui/InstructionText';
import GuessLogItem from '@/components/game/GuessLogItem';

interface GameScreenProps {
    chosenNumber: number;
    onGameOver: (numRounds: number) => void;
}

let minBoundary = 1;
let maxBoundary = 100;

export default function GameScreen({
    chosenNumber,
    onGameOver,
}: GameScreenProps) {
    const initialGuess = useMemo(() => {
        minBoundary = 1;
        maxBoundary = 100;
        return generateRandomBetween(1, 100, chosenNumber);
    }, [chosenNumber]);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRounds, setGuessRounds] = useState<number[]>([]);

    useEffect(() => {
        if (currentGuess === chosenNumber) {
            onGameOver(guessRounds.length);
        }
    }, [currentGuess, chosenNumber]);

    function nextGuessHandler(direction: 'lower' | 'higher') {
        if (
            (direction === 'lower' && currentGuess < chosenNumber) ||
            (direction === 'higher' && currentGuess > chosenNumber)
        ) {
            Alert.alert("Don't lie!", 'You know this is wrong.', [
                { text: 'Sorry!', style: 'cancel' },
            ]);
            return;
        }

        if (direction === 'lower') {
            maxBoundary = currentGuess;
        } else {
            minBoundary = currentGuess + 1;
        }
        const newRndNumber = generateRandomBetween(
            minBoundary,
            maxBoundary,
            currentGuess
        );
        setCurrentGuess(newRndNumber);
        setGuessRounds(ps => [newRndNumber, ...ps]);
    }

    return (
        <View style={styles.container}>
            <Title>Opponent's Guess</Title>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card>
                <InstructionText style={styles.instructionText}>
                    Higher or Lower?
                </InstructionText>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton
                            onPress={nextGuessHandler.bind(null, 'lower')}
                        >
                            <Ionicons name='remove' size={24} color='white' />
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton
                            onPress={nextGuessHandler.bind(null, 'higher')}
                        >
                            <Ionicons name='add' size={24} color='white' />
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
            <View style={styles.listContainer}>
                <FlatList
                    data={guessRounds}
                    keyExtractor={item => item.toString()}
                    renderItem={({ item, index }) => (
                        <GuessLogItem roundNumber={index + 1} guess={item} />
                    )}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 12,
    },
    instructionText: {
        marginBottom: 12,
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
    },
    listContainer: {
        flex: 1,
        padding: 16,
    },
});
