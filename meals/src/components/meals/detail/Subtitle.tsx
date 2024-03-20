import { View, Text, StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface SubtitleProps {
    children: string;
    textStyle?: TextStyle;
    viewStyle?: ViewStyle;
}

export default function Subtitle({
    children,
    textStyle,
    viewStyle,
}: SubtitleProps) {
    return (
        <View style={[styles.subtitleContainer, viewStyle]}>
            <Text style={[styles.subtitle, textStyle]}>{children}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    subtitleContainer: {
        marginHorizontal: 12,
        marginVertical: 4,
        padding: 6,
        borderBottomColor: '#e2b497',
        borderBottomWidth: 2,
    },
    subtitle: {
        color: '#e2b497',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
