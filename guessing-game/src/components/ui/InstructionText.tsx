import { Text, StyleSheet, TextStyle } from 'react-native';
import { Colors } from '@/constants/colors';

interface InstructionTextProps {
    style?: TextStyle;
    children: React.ReactNode;
}

export default function InstructionText({
    children,
    style,
}: InstructionTextProps) {
    return <Text style={[styles.text, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
    text: {
        color: Colors.accent500,
        fontFamily: 'open-sans',
        fontSize: 24,
    },
});
