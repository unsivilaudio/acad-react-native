import { View, StyleSheet } from 'react-native';
import { Colors } from '@/constants/colors';

interface CardProps {
    children: React.ReactNode;
}

export default function Card({ children }: CardProps) {
    return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 36,
        marginHorizontal: 24,
        padding: 16,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        elevation: 4,
    },
});
