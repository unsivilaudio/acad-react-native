import { AuthContext } from '@/store/context/auth-context';
import { useContext } from 'react';

export function useAuthContext() {
    const ctx = useContext(AuthContext);

    if (!ctx) {
        throw new Error(
            'You must use this hook in the context of a wrapping <AuthContextProvider> component!'
        );
    }

    return ctx;
}
