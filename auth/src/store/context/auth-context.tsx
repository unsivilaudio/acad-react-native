import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    type PropsWithChildren,
    createContext,
    useReducer,
    useCallback,
} from 'react';

type AuthContextState = {
    token: null | string;
    isAuthenticated: boolean;
};

const __INITIAL_STATE: AuthContextState = {
    token: '',
    isAuthenticated: false,
};

type AuthContextValue = AuthContextState & {
    authenticate(token: string): Promise<void>;
    logout(): void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

type SET_TOKEN = {
    type: 'SET_TOKEN';
    payload: {
        token: string;
    };
};

type CLEAR_TOKEN = {
    type: 'CLEAR_TOKEN';
    payload?: never;
};

type AuthActions = SET_TOKEN | CLEAR_TOKEN;

function authReducer(state: AuthContextState, action: AuthActions) {
    switch (action.type) {
        case 'SET_TOKEN':
            return {
                ...state,
                token: action.payload.token,
                isAuthenticated: true,
            };
        case 'CLEAR_TOKEN':
            return {
                ...state,
                token: null,
                isAuthenticated: false,
            };
        default:
            return state;
    }
}

export default function AuthContextProvider({ children }: PropsWithChildren) {
    const [state, dispatch] = useReducer(authReducer, __INITIAL_STATE);

    const authenticate = useCallback(async (token: string): Promise<void> => {
        dispatch({ type: 'SET_TOKEN', payload: { token } });
        await AsyncStorage.setItem('token', token);
    }, []);

    function logout() {
        dispatch({ type: 'CLEAR_TOKEN' });
        AsyncStorage.removeItem('token');
    }

    const authCtxValue: AuthContextValue = {
        ...state,
        authenticate,
        logout,
    };

    return (
        <AuthContext.Provider value={authCtxValue}>
            {children}
        </AuthContext.Provider>
    );
}
