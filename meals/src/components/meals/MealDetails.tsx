import { View, Text, StyleSheet, TextStyle, ViewStyle } from 'react-native';

interface MealDetailsProps {
    duration: number;
    complexity: string;
    affordability: string;
    viewStyle?: ViewStyle;
    textStyle?: TextStyle;
}

export default function MealDetails({
    duration,
    complexity,
    affordability,
    viewStyle,
    textStyle,
}: MealDetailsProps) {
    return (
        <View style={[styles.details, viewStyle]}>
            <Text style={[styles.detailText, textStyle]}>{duration}m</Text>
            <Text style={[styles.detailText, textStyle]}>
                {complexity.toUpperCase()}
            </Text>
            <Text style={[styles.detailText, textStyle]}>
                {affordability.toUpperCase()}
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    details: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
        gap: 8,
    },
    detailText: {
        fontSize: 12,
        marginBottom: 8,
    },
});
