import { registerRootComponent } from 'expo';
import { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Goal from '@/models/goal';
import Button from '@/components/ui/Button';
import GoalList from '@/components/goals/GoalList';
import GoalForm from '@/components/goals/GoalForm';

registerRootComponent(App);

export default function App() {
    const [modalIsVisible, setModalIsVisible] = useState(false);
    const [courseGoals, setCourseGoals] = useState<Goal[]>([]);

    function addGoalHandler(goal: Goal) {
        setCourseGoals(ps => [goal, ...ps]);
        setModalIsVisible(false);
    }

    function deleteGoalHandler(id: string) {
        setCourseGoals(ps => ps.filter(goal => goal.id !== id));
    }

    function handleCloseModal() {
        setModalIsVisible(false);
    }

    return (
        <>
            <StatusBar translucent style='light' />
            <View style={styles.appContainer}>
                <View style={styles.appActions}>
                    <Button
                        text='Add New Goal'
                        variant='tertiary'
                        onPress={() => setModalIsVisible(ps => !ps)}
                    />
                </View>
                <GoalForm
                    onAddGoal={addGoalHandler}
                    show={modalIsVisible}
                    onHideForm={handleCloseModal}
                />
                <GoalList
                    goals={courseGoals}
                    onDeleteGoal={deleteGoalHandler}
                />
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    appContainer: {
        backgroundColor: '#1e085a',
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 16,
    },
    appActions: {
        marginTop: 10,
        maxHeight: 40,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
