import { StyleSheet, Pressable, Text, View } from 'react-native';

const btnVariants = {
    primary: ['#3d83ed', '#1a50a1'],
    secondary: ['#b180f0', '#3d0e7b'],
    tertiary: ['#f31282', '#c40b67'],
};

interface ButtonProps {
    variant?: keyof typeof btnVariants;
    onPress: () => void;
    text: string;
}

export default function Button({
    onPress,
    text,
    variant = 'primary',
}: ButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => [
                styles.container,
                { backgroundColor: btnVariants[variant][0] },
                pressed && { backgroundColor: btnVariants[variant][1] },
            ]}
        >
            <View style={styles.textContainer}>
                <Text style={styles.textStyle}>{text}</Text>
            </View>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        paddingHorizontal: 12,
        paddingVertical: 3,
        backgroundColor: '#ccc',
        borderRadius: 8,
        elevation: 5,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    textStyle: {
        color: '#ececec',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
