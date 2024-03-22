import { useState } from 'react';
import { Alert } from 'react-native';

import { login } from '@/util/auth';
import { useAuthContext } from '@/store/hooks/use-auth-ctx';

import AuthContent from '@/components/auth/AuthContent';
import LoadingOverlay from '@/components/ui/LoadingOverlay';

function LoginScreen() {
    const authCtx = useAuthContext();
    const [isAuthenticating, setIsAuthenticating] = useState(false);

    async function loginHandler({
        email,
        password,
    }: {
        email: string;
        password: string;
    }) {
        setIsAuthenticating(true);
        try {
            const token = await login(email, password);
            authCtx.authenticate(token);
        } catch {
            Alert.alert(
                'Authentication Failed!',
                'Could not log you in.  Please check your credentials or try again later!'
            );
            setIsAuthenticating(false);
        }
    }

    if (isAuthenticating) {
        return <LoadingOverlay message='Logging you in...' />;
    }
    return <AuthContent isLogin onAuthenticate={loginHandler} />;
}

export default LoginScreen;
