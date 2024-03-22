import { View, Text, StyleSheet } from 'react-native';

import { GlobalStyles } from '@/constants/styles';
import Button from '@/components/ui/Button';

interface ErrorOverlayProps {
    onConfirm: () => void;
    message: string;
}

export default function ErrorOverlay({
    message,
    onConfirm,
}: ErrorOverlayProps) {
    return (
        <View style={styles.errorContainer}>
            <Text style={[styles.text, styles.title]}>An error occurred!</Text>
            <Text style={styles.text}>{message}</Text>
            <Button onPress={onConfirm}>Okay</Button>
        </View>
    );
}

const styles = StyleSheet.create({
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.Colors.primary700,
    },
    text: {
        color: 'white',
        textAlign: 'center',
        marginBottom: 8,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
    },
});
