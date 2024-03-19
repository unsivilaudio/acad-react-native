import { useState } from 'react';
import {
    View,
    TextInput,
    StyleSheet,
    Modal,
    Pressable,
    Image,
} from 'react-native';

import Goal from '@/models/goal';
import Button from '@/components/ui/Button';

interface GoalFormProps {
    onHideForm: () => void;
    onAddGoal(goal: Goal): void;
    show: boolean;
}

export default function GoalForm({
    onAddGoal,
    onHideForm,
    show,
}: GoalFormProps) {
    const [enteredGoal, setEnteredGoal] = useState('');

    function goalInputHandler(value: string) {
        setEnteredGoal(value);
    }

    function handleAddGoal() {
        if (enteredGoal.trim() === '') return;
        const goal = Goal.create(enteredGoal);
        onAddGoal(goal);
        setEnteredGoal('');
    }

    return (
        <Modal
            animationType='fade'
            transparent={true}
            visible={show}
            onRequestClose={onHideForm}
        >
            <Pressable
                onPress={onHideForm}
                style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.55)' }}
            />
            <View style={styles.container}>
                <Image
                    style={styles.image}
                    source={require('../../assets/images/goal.png')}
                />
                <View style={styles.inputContainer}>
                    <TextInput
                        value={enteredGoal}
                        style={styles.textInput}
                        placeholder='Your course goal'
                        onChangeText={goalInputHandler}
                    />
                    <Button
                        text='Add Goal'
                        variant='secondary'
                        onPress={handleAddGoal}
                    />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        width: '100%',
        gap: 10,
        padding: 12,
        paddingBottom: 20,
        backgroundColor: '#311b6b',
        elevation: 5,
    },
    image: {
        width: 100,
        height: 100,
        marginBottom: 8,
    },
    inputContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 8,
    },
    textInput: {
        borderWidth: 1,
        borderRadius: 999,
        color: '#ecedef',
        borderColor: '#e4d0ff',
        backgroundColor: '#e4d0ff',
        padding: 8,
        paddingLeft: 16,
        flex: 1,
    },
});
