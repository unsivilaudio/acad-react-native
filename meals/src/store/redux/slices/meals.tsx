import {
    createSlice,
    type PayloadAction,
    type SliceSelectors,
} from '@reduxjs/toolkit';

export interface MealsState {
    favorites: string[];
}

type ADD_FAVORITE = PayloadAction<{ id: string }>;
type REMOVE_FAVORITE = PayloadAction<{ id: string }>;

type MealsReducers = {
    addFavorite(state: MealsState, payload: ADD_FAVORITE): void;
    removeFavorite(state: MealsState, payload: REMOVE_FAVORITE): void;
};
const __INITIAL_STATE: MealsState = {
    favorites: [],
};

const mealsSlice = createSlice<
    MealsState,
    MealsReducers,
    'meals',
    SliceSelectors<MealsState>
>({
    name: 'meals',
    initialState: __INITIAL_STATE,
    reducers: {
        addFavorite(state, action) {
            state.favorites.push(action.payload.id);
        },
        removeFavorite(state, action) {
            const idx = state.favorites.findIndex(
                (fav) => fav === action.payload.id,
            );
            if (idx >= 0) {
                state.favorites.splice(idx, 1);
            }
        },
    },
});

export const { addFavorite, removeFavorite } = mealsSlice.actions;
export default mealsSlice.reducer;
