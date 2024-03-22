import { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Button from '@/components/ui/Button';
import Input from '@/components/auth/Input';

interface AuthFormProps {
    isLogin: boolean;
    onSubmit: (creds: {
        email: string;
        confirmEmail: string;
        password: string;
        confirmPassword: string;
    }) => void;
    credentialsInvalid: {
        email: boolean;
        confirmEmail: boolean;
        password: boolean;
        confirmPassword: boolean;
    };
}

function AuthForm({ isLogin, onSubmit, credentialsInvalid }: AuthFormProps) {
    const [enteredEmail, setEnteredEmail] = useState('');
    const [enteredConfirmEmail, setEnteredConfirmEmail] = useState('');
    const [enteredPassword, setEnteredPassword] = useState('');
    const [enteredConfirmPassword, setEnteredConfirmPassword] = useState('');

    const {
        email: emailIsInvalid,
        confirmEmail: emailsDontMatch,
        password: passwordIsInvalid,
        confirmPassword: passwordsDontMatch,
    } = credentialsInvalid;

    function updateInputValueHandler(inputType: string, enteredValue: string) {
        switch (inputType) {
            case 'email':
                setEnteredEmail(enteredValue);
                break;
            case 'confirmEmail':
                setEnteredConfirmEmail(enteredValue);
                break;
            case 'password':
                setEnteredPassword(enteredValue);
                break;
            case 'confirmPassword':
                setEnteredConfirmPassword(enteredValue);
                break;
        }
    }

    function submitHandler() {
        onSubmit({
            email: enteredEmail,
            confirmEmail: enteredConfirmEmail,
            password: enteredPassword,
            confirmPassword: enteredConfirmPassword,
        });
    }

    return (
        <View style={styles.form}>
            <View>
                <Input
                    label='Email Address'
                    onUpdateValue={updateInputValueHandler.bind(null, 'email')}
                    value={enteredEmail}
                    keyboardType='email-address'
                    isInvalid={emailIsInvalid}
                />
                {!isLogin && (
                    <Input
                        label='Confirm Email Address'
                        onUpdateValue={updateInputValueHandler.bind(
                            null,
                            'confirmEmail'
                        )}
                        value={enteredConfirmEmail}
                        keyboardType='email-address'
                        isInvalid={emailsDontMatch}
                    />
                )}
                <Input
                    label='Password'
                    onUpdateValue={updateInputValueHandler.bind(
                        null,
                        'password'
                    )}
                    secure
                    value={enteredPassword}
                    isInvalid={passwordIsInvalid}
                />
                {!isLogin && (
                    <Input
                        label='Confirm Password'
                        onUpdateValue={updateInputValueHandler.bind(
                            null,
                            'confirmPassword'
                        )}
                        secure
                        value={enteredConfirmPassword}
                        isInvalid={passwordsDontMatch}
                    />
                )}
                <View style={styles.buttons}>
                    <Button onPress={submitHandler}>
                        {isLogin ? 'Log In' : 'Sign Up'}
                    </Button>
                </View>
            </View>
        </View>
    );
}

export default AuthForm;

const styles = StyleSheet.create({
    form: {},
    buttons: {
        marginTop: 12,
    },
});