import { createContext, useReducer, useContext } from 'react';

type FavoriteContextState = {
    ids: string[];
};
type FavoriteContextValue = FavoriteContextState & {
    addFavorite(id: string): void;
    removeFavorite(id: string): void;
};

const FavoriteContext = createContext<FavoriteContextValue | null>(null);

export function useFavoriteCtx() {
    const ctx = useContext(FavoriteContext);

    if (!ctx) {
        throw new Error(
            'You must use this hook with the context of a wrapping provider component!',
        );
    }

    return ctx;
}

type AddAction = {
    type: 'ADD_FAVORITE';
    payload: {
        id: string;
    };
};

type RemoveAction = {
    type: 'REMOVE_FAVORITE';
    payload: {
        id: string;
    };
};

type FavoriteActions = AddAction | RemoveAction;

function favoriteReducer(
    state: FavoriteContextState,
    action: FavoriteActions,
): FavoriteContextState {
    switch (action.type) {
        case 'ADD_FAVORITE':
            return { ...state, ids: [...state.ids, action.payload.id] };
        case 'REMOVE_FAVORITE':
            return {
                ...state,
                ids: state.ids.filter((id) => id !== action.payload.id),
            };
        default:
            return state;
    }
}

interface FavoriteContextProviderProps {
    children: React.ReactNode;
}

export default function FavoriteContextProvider({
    children,
}: FavoriteContextProviderProps) {
    const [state, dispatch] = useReducer(favoriteReducer, { ids: [] });

    function addFavorite(id: string) {
        dispatch({ type: 'ADD_FAVORITE', payload: { id } });
    }

    function removeFavorite(id: string) {
        dispatch({ type: 'REMOVE_FAVORITE', payload: { id } });
    }

    const ctxValue: FavoriteContextValue = {
        addFavorite,
        removeFavorite,
        ...state,
    };

    return (
        <FavoriteContext.Provider value={ctxValue}>
            {children}
        </FavoriteContext.Provider>
    );
}
