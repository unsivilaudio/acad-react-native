import { Text, StyleSheet } from 'react-native';

import { Colors } from '@/constants/colors';

interface TitleProps {
    children: React.ReactNode;
}

export default function Title({ children }: TitleProps) {
    return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 24,
        color: 'white',
        textAlign: 'center',
        borderWidth: 2,
        borderColor: 'white',
        padding: 12,
    },
});
