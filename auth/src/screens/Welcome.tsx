import { useAuthContext } from '@/store/hooks/use-auth-ctx';
import { FIREBASE_RDB_URL } from '@env';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

function WelcomeScreen() {
    const { token } = useAuthContext();
    const [fetchedMessage, setFetchedMesssage] = useState('');

    useEffect(() => {
        axios
            .get(`${FIREBASE_RDB_URL}/message.json?auth=${token}`)
            .then(res => {
                setFetchedMesssage(res.data);
            });
    }, [token]);

    return (
        <View style={styles.rootContainer}>
            <Text style={styles.title}>Welcome!</Text>
            <Text>You authenticated successfully!</Text>
            <Text>{fetchedMessage}</Text>
        </View>
    );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 32,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 8,
    },
});
