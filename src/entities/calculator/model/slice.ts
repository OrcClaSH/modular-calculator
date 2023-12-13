import { createSlice } from '@reduxjs/toolkit';

import { MODE_ENUM } from '@shared/config/constants';

const initialState = {
  calcMode: MODE_ENUM.CONSTRUCTOR,
};

export const calcSlice = createSlice({
  name: 'calc',
  initialState,
  reducers: {
    toggleCalcMode(state) {
      state.calcMode =
        state.calcMode === MODE_ENUM.CONSTRUCTOR
          ? MODE_ENUM.RUNTIME
          : MODE_ENUM.CONSTRUCTOR;
    },
  },
});

export const selectCalcMode = (state: TRootState) => state.calc.calcMode;

export const { reducer: calcReducer } = calcSlice;
export const calcActions = {
  ...calcSlice.actions,
};
