import { useState } from 'react';
import { Alert } from 'react-native';

import { createUser } from '@/util/auth';
import { useAuthContext } from '@/store/hooks/use-auth-ctx';

import AuthContent from '@/components/auth/AuthContent';
import LoadingOverlay from '@/components/ui/LoadingOverlay';

function SignupScreen() {
    const authCtx = useAuthContext();
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    async function signupHandler({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) {
        setIsAuthenticating(true);
        try {
            const token = await createUser(email, password);
            authCtx.authenticate(token);
        } catch {
            Alert.alert(
                'Authentication failed!',
                'Could not create user, please check your inputs and try again later.'
            );
            setIsAuthenticating(false);
        }
    }

    if (isAuthenticating) {
        return <LoadingOverlay message='Creating user...' />;
    }

    return <AuthContent isLogin={false} onAuthenticate={signupHandler} />;
}

export default SignupScreen;
