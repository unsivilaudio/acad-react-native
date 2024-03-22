import { FIREBASE_WEB_API_TOKEN } from '@env';
import axios from 'axios';

const token = FIREBASE_WEB_API_TOKEN;
if (!token) {
    throw new Error(
        'Please create an {FIREBASE_WEB_API_TOKEN} in your environment config file!'
    );
}

interface FirebaseAuthResponse {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
}

type Authenticate = (
    mode: 'login' | 'signup',
    creds: { email: string; password: string }
) => Promise<string>;

const authenticate: Authenticate = async (mode, { email, password }) => {
    const endpoint = mode === 'login' ? 'signInWithPassword' : 'signUp';
    const response = await axios.post<FirebaseAuthResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:${endpoint}?key=${token}`,
        {
            email,
            password,
            returnSecureToken: true,
        }
    );

    return response.data.idToken;
};

export function createUser(email: string, password: string) {
    return authenticate('signup', { email, password });
}

export function login(email: string, password: string) {
    return authenticate('login', { email, password });
}
