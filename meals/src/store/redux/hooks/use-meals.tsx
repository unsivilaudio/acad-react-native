import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';

import type { RootStore } from '@/store/redux';
import {
    addFavorite,
    removeFavorite,
    type MealsState,
} from '@/store/redux/slices/meals';

export default function useMealsStore() {
    const dispatch = useDispatch();
    const meals = useSelector<RootStore, MealsState>((store) => store.meals);

    if (!meals) {
        throw new Error(
            'You must use this hook in the context of Redux store!',
        );
    }

    const actions = bindActionCreators(
        { addFavorite, removeFavorite },
        dispatch,
    );

    return { ...meals, ...actions };
}
