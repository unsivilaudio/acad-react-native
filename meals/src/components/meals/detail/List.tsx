import { View, Text, StyleSheet } from 'react-native';

interface ListProps<T> {
    data: T[];
}

export default function List<T extends string>({ data }: ListProps<T>) {
    return data.map((dataPoint: T) => (
        <View key={dataPoint} style={styles.listItem}>
            <Text style={styles.itemText}>{dataPoint}</Text>
        </View>
    ));
}

const styles = StyleSheet.create({
    listItem: {
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginVertical: 4,
        marginHorizontal: 12,
        backgroundColor: '#e2b497',
    },
    itemText: {
        color: '#351401',
        textAlign: 'center',
    },
});
