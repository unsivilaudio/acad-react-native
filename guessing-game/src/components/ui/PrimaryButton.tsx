import { View, Text, StyleSheet, Pressable, Platform } from 'react-native';

import { Colors } from '@/constants/colors';

interface PrimaryButtonProps {
    onPress: () => void;
    children: React.ReactNode;
}

export default function PrimaryButton({
    children,
    onPress,
}: PrimaryButtonProps) {
    return (
        <View style={styles.buttonPressContainer}>
            <Pressable
                onPress={onPress}
                android_ripple={{ color: Colors.primary600 }}
                style={({ pressed }) =>
                    pressed && Platform.OS === 'ios'
                        ? [styles.buttonContainer, styles.pressed]
                        : styles.buttonContainer
                }
            >
                <Text style={styles.buttonText}>{children}</Text>
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonPressContainer: {
        borderRadius: 28,
        margin: 4,
        overflow: 'hidden',
    },
    buttonContainer: {
        backgroundColor: Colors.primary500,
        paddingVertical: 8,
        paddingHorizontal: 16,
        elevation: 2,
    },
    buttonText: {
        color: 'white',
        textAlign: 'center',
    },
    pressed: {
        opacity: 0.75,
    },
});
