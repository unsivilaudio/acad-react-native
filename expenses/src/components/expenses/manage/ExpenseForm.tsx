import ExpenseInput from '@/components/expenses/manage/Input';
import Button from '@/components/ui/Button';
import { GlobalStyles } from '@/constants/styles';
import type { Expense } from '@/models/expense';
import { getFormattedDate } from '@/util/date';
import { useState } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';

interface ExpenseFormProps {
    initialState?: Expense;
    submitButtonLabel: string;
    onSubmit(exp: Omit<Expense, 'id'>): void;
    onCancel: () => void;
}

type InputState = {
    amount: {
        value: string;
        isValid: boolean;
    };
    date: {
        value: string;
        isValid: boolean;
    };
    description: {
        value: string;
        isValid: boolean;
    };
};
type InputIdentifier = keyof InputState;

export default function ExpenseForm({
    initialState,
    onCancel,
    onSubmit,
    submitButtonLabel,
}: ExpenseFormProps) {
    const [inputs, setInputs] = useState<InputState>({
        amount: {
            value: initialState?.amount?.toString() || '',
            isValid: true,
        },
        date: {
            value: initialState?.date
                ? getFormattedDate(initialState.date)
                : '',
            isValid: true,
        },
        description: {
            value: initialState?.description || '',
            isValid: true,
        },
    });

    function inputChangeHandler(ident: InputIdentifier, value: string) {
        setInputs((ps) => ({
            ...ps,
            [ident]: {
                isValid: true,
                value,
            },
        }));
    }

    function submitHandler() {
        const expenseData = {
            amount: +inputs.amount.value,
            date: new Date(inputs.date.value),
            description: inputs.description.value,
        };

        const amountIsValid =
            !isNaN(expenseData.amount) && expenseData.amount > 0;
        const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
        const descriptionIsValid = expenseData.description.trim().length > 0;

        if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
            // Alert.alert('Invalid inputs!', 'Please check your input values.');
            setInputs((ps) => ({
                amount: {
                    ...ps.amount,
                    isValid: amountIsValid,
                },
                date: {
                    ...ps.date,
                    isValid: dateIsValid,
                },
                description: {
                    ...ps.description,
                    isValid: descriptionIsValid,
                },
            }));
            return;
        }

        onSubmit(expenseData);
    }

    const formIsInvalid = Object.values(inputs).some(
        (val) => val.isValid === false,
    );

    return (
        <View style={styles.form}>
            <Text style={styles.title}>Your Expense</Text>
            <View style={styles.inputsRow}>
                <ExpenseInput
                    viewStyle={styles.rowInput}
                    label='Amount'
                    invalid={!inputs.amount.isValid}
                    textInputConfig={{
                        keyboardType: 'decimal-pad',
                        onChangeText: inputChangeHandler.bind(null, 'amount'),
                        value: inputs.amount.value,
                    }}
                />
                <ExpenseInput
                    viewStyle={styles.rowInput}
                    label='Date'
                    invalid={!inputs.date.isValid}
                    textInputConfig={{
                        placeholder: 'YYYY-MM-DD',
                        maxLength: 10,
                        onChangeText: inputChangeHandler.bind(null, 'date'),
                        value: inputs.date.value,
                    }}
                />
            </View>
            <ExpenseInput
                label='Description'
                invalid={!inputs.description.isValid}
                textInputConfig={{
                    multiline: true,
                    autoCapitalize: 'sentences',
                    onChangeText: inputChangeHandler.bind(null, 'description'),
                    value: inputs.description.value,
                }}
            />
            {formIsInvalid && (
                <Text style={styles.errorText}>
                    Invalid input values -- please check your entered data!
                </Text>
            )}
            <View style={styles.buttonsContainer}>
                <Button
                    mode='flat'
                    viewStyle={styles.button}
                    onPress={onCancel}
                >
                    Cancel
                </Button>
                <Button viewStyle={styles.button} onPress={submitHandler}>
                    {submitButtonLabel}
                </Button>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    form: {
        marginTop: 40,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginVertical: 24,
        textAlign: 'center',
    },
    inputsRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    rowInput: {
        flex: 1,
    },
    errorText: {
        textAlign: 'center',
        color: GlobalStyles.Colors.error500,
        margin: 8,
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        minWidth: 120,
        marginHorizontal: 8,
    },
});
