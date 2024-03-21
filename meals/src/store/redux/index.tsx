import { configureStore } from '@reduxjs/toolkit';

import meals from '@/store/redux/slices/meals';

const store = configureStore({
    reducer: {
        meals,
    },
});

export type RootStore = ReturnType<typeof store.getState>;

export default store;
