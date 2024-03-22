import { View, ActivityIndicator, StyleSheet } from 'react-native';

import { GlobalStyles } from '@/constants/styles';

interface LoadingOverlayProps {
    size?: 'large' | 'small';
    color?: string;
}

export default function LoadingOverlay({
    size = 'large',
    color = 'white',
}: LoadingOverlayProps) {
    return (
        <View style={styles.loadingContainer}>
            <ActivityIndicator size={size} color={color} />
        </View>
    );
}

const styles = StyleSheet.create({
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
        backgroundColor: GlobalStyles.Colors.primary700,
    },
});
