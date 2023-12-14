import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { MODE_ENUM } from '@shared/config/constants';

interface ICalcState {
  calcMode: MODE_ENUM;
  totalCalcBlocksIds: number[];
}

const initialState: ICalcState = {
  calcMode: MODE_ENUM.CONSTRUCTOR,
  totalCalcBlocksIds: [],
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
    setTotalCalcBlocksIds(state, action: PayloadAction<number[]>) {
      state.totalCalcBlocksIds = action.payload;
    },
  },
});

export const selectCalcMode = (state: TRootState) => state.calc.calcMode;
export const selectTotalCalcBlocksIds = (state: TRootState) =>
  state.calc.totalCalcBlocksIds;

export const { reducer: calcReducer } = calcSlice;
export const calcActions = {
  ...calcSlice.actions,
};
