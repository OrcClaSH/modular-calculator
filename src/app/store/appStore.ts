import { configureStore } from '@reduxjs/toolkit';

import { calcReducer } from '@entities/calculator';

export const appStore = configureStore({
  reducer: {
    calc: calcReducer,
  },
});

export type TRootState = ReturnType<typeof appStore.getState>;
export type AppDispatch = typeof appStore.dispatch;
