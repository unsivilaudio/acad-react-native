import { useState } from 'react';
import {
    Alert,
    View,
    TextInput,
    StyleSheet,
    useWindowDimensions,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native';

import { Colors } from '@/constants/colors';
import PrimaryButton from '@/components/ui/PrimaryButton';
import Title from '@/components/ui/Title';
import Card from '@/components/ui/Card';
import InstructionText from '@/components/ui/InstructionText';

interface StartGameScreenProps {
    onPickNumber: (n: number) => void;
}

export default function StartGameScreen({
    onPickNumber,
}: StartGameScreenProps) {
    const [enteredNumber, setEnteredNumber] = useState('');

    const { height } = useWindowDimensions();

    function numberInputHandler(value: string) {
        setEnteredNumber(value);
    }

    function handleConfirmGuess() {
        const choosenNumber = parseInt(enteredNumber);

        if (isNaN(choosenNumber) || choosenNumber <= 0 || choosenNumber > 99) {
            Alert.alert(
                'Invalid number!',
                'Number has to be a number between 1 and 99.',
                [
                    {
                        text: 'Okay',
                        style: 'destructive',
                        onPress: handleResetGuess,
                    },
                ]
            );
            return;
        }

        onPickNumber(choosenNumber);
    }

    function handleResetGuess() {
        setEnteredNumber('');
    }

    const marginTop = height < 400 ? 30 : 100;

    return (
        <ScrollView style={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }} behavior='position'>
                <View style={[styles.rootContainer, { marginTop }]}>
                    <Title>Guess My Number</Title>
                    <Card>
                        <InstructionText>Enter a number</InstructionText>
                        <TextInput
                            style={styles.numberInput}
                            value={enteredNumber}
                            onChangeText={numberInputHandler}
                            maxLength={2}
                            keyboardType='number-pad'
                            autoCapitalize='none'
                            autoCorrect={false}
                            autoComplete='off'
                        />
                        <View style={styles.buttonsContainer}>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={handleResetGuess}>
                                    Reset
                                </PrimaryButton>
                            </View>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={handleConfirmGuess}>
                                    Confirm
                                </PrimaryButton>
                            </View>
                        </View>
                    </Card>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

// const deviceHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        marginTop: 100,
        alignItems: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
    },
    numberInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        textAlign: 'center',
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: 'bold',
    },
});
