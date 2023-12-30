import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { CALC_OPERATIONS, MODE_ENUM } from '@shared/config/constants';

import { handleCalculate, handleLastEqual, handleLastString } from './handlers';

export interface ICalcState {
  calcMode: MODE_ENUM;
  totalCalcBlocksIds: number[];
  value: string;
  valuePrev: string;
  valueOperation: string;
  result: string;
  isLastString: boolean;
  isLastEqual: boolean;
}

const initialState: ICalcState = {
  calcMode: MODE_ENUM.CONSTRUCTOR,
  totalCalcBlocksIds: [],
  value: '',
  valuePrev: '',
  valueOperation: '',
  result: '',
  isLastString: false,
  isLastEqual: false,
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

    setValue(state, action: PayloadAction<string>) {
      const value = action.payload;

      if (typeof value === 'string' && value in CALC_OPERATIONS) {
        handleLastString(state, value);
        return;
      }
      handleLastEqual(state, value);
    },

    calculate(state) {
      handleCalculate(state);
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
