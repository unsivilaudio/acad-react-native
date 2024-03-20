import { View, StyleSheet, Dimensions } from 'react-native';
import { Colors } from '@/constants/colors';

interface CardProps {
    children: React.ReactNode;
}

export default function Card({ children }: CardProps) {
    return <View style={styles.container}>{children}</View>;
}

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: deviceWidth < 380 ? 18 : 36,
        marginHorizontal: 24,
        padding: 16,
        backgroundColor: Colors.primary800,
        borderRadius: 8,
        elevation: 4,
    },
});
