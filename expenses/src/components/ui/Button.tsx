import { GlobalStyles } from '@/constants/styles';
import { View, Text, StyleSheet, Pressable, ViewStyle } from 'react-native';

interface ButtonProps {
    mode?: 'flat';
    children: string;
    onPress: () => void;
    viewStyle?: ViewStyle;
}

export default function Button({
    children,
    mode,
    onPress,
    viewStyle,
}: ButtonProps) {
    return (
        <View style={viewStyle}>
            <Pressable
                onPress={onPress}
                style={({ pressed }) => pressed && styles.pressed}
            >
                <View style={[styles.button, mode === 'flat' && styles.flat]}>
                    <Text
                        style={[
                            styles.buttonText,
                            mode === 'flat' && styles.flatText,
                        ]}
                    >
                        {children}
                    </Text>
                </View>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    button: {
        borderRadius: 4,
        padding: 8,
        backgroundColor: GlobalStyles.Colors.primary500,
    },
    flat: {
        backgroundColor: 'transparent',
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    flatText: {
        color: GlobalStyles.Colors.primary200,
    },
    pressed: {
        opacity: 0.75,
        backgroundColor: GlobalStyles.Colors.primary100,
        borderRadius: 4,
    },
});
