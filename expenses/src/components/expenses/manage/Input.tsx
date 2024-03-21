import {
    View,
    Text,
    StyleSheet,
    TextInput,
    TextInputProps,
    ViewStyle,
} from 'react-native';

import { GlobalStyles } from '@/constants/styles';

interface ExpenseInputProps {
    label: string;
    invalid?: boolean;
    viewStyle?: ViewStyle;
    textInputConfig?: TextInputProps;
}

export default function ExpenseInput({
    label,
    invalid = false,
    textInputConfig,
    viewStyle,
}: ExpenseInputProps) {
    let inputStyles = { ...styles.input };

    if (textInputConfig && textInputConfig.multiline) {
        inputStyles = {
            ...inputStyles,
            ...styles.inputMultiline,
        };
    }

    return (
        <View style={[styles.inputContainer, viewStyle]}>
            <Text style={[styles.label, invalid && styles.invalidLabel]}>
                {label}
            </Text>
            <TextInput
                style={[inputStyles, invalid && styles.invalidInput]}
                {...textInputConfig}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    inputContainer: {
        marginHorizontal: 4,
        marginVertical: 8,
    },
    label: {
        fontSize: 12,
        color: GlobalStyles.Colors.primary100,
        marginBottom: 4,
    },
    input: {
        color: GlobalStyles.Colors.primary700,
        backgroundColor: GlobalStyles.Colors.primary100,
        padding: 6,
        borderRadius: 6,
        fontSize: 18,
    },
    inputMultiline: {
        minHeight: 100,
        textAlignVertical: 'top',
    },
    invalidLabel: {
        color: GlobalStyles.Colors.error500,
    },
    invalidInput: {
        backgroundColor: GlobalStyles.Colors.error50,
    },
});
