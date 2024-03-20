import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface IconButtonProps<T extends keyof typeof Ionicons.glyphMap> {
    size?: number;
    icon: T;
    color: string;
    onPress: () => void;
}

export default function IconButton<T extends keyof typeof Ionicons.glyphMap>({
    icon,
    size = 24,
    color,
    onPress,
}: IconButtonProps<T>) {
    return (
        <Pressable
            style={({ pressed }) => pressed && styles.container}
            onPress={onPress}
        >
            <Ionicons name={icon} size={size} color={color} />
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
        opacity: 0.7,
    },
});
