import { View, Text, StyleSheet, Dimensions } from 'react-native';

import { Colors } from '@/constants/colors';

interface NumberContainerProps {
    children: React.ReactNode;
}

export default function NumberContainer({ children }: NumberContainerProps) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{children}</Text>
        </View>
    );
}

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        borderWidth: 2,
        borderColor: Colors.accent500,
        padding: deviceWidth < 380 ? 12 : 24,
        borderRadius: 8,
        margin: deviceWidth < 380 ? 12 : 24,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: Colors.accent500,
        fontFamily: 'open-sans-bold',
        fontSize: 36,
    },
});
