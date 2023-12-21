import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { CALC_OPERATIONS, ERROR_DISPLAY_TEXT, MODE_ENUM } from '@shared/config/constants';
import { replaceZero } from '@shared/lib/replace-zero';

interface ICalcState {
  calcMode: MODE_ENUM;
  totalCalcBlocksIds: number[];
  value: string;
  valuePrev: string;
  valueOperation: string;
  result: string;
  isLastString: boolean;
}

const initialState: ICalcState = {
  calcMode: MODE_ENUM.CONSTRUCTOR,
  totalCalcBlocksIds: [],
  value: '',
  valuePrev: '',
  valueOperation: '',
  result: '',
  isLastString: false,
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

    setValue(state, action: PayloadAction<number | string>) {
      const value = action.payload;

      if (typeof value === 'string' && value in CALC_OPERATIONS) {
        state.valueOperation = value;
        state.valuePrev = state.value;
        state.value = '';
        state.isLastString = true;
        return;
      }

      if (value === ',') {
        if (state.value.includes(',')) {
          return;
        }
        state.value += value;
        state.result = replaceZero(state.value);
        return;
      }

      if (state.isLastString) {
        state.value += value;
        state.isLastString = false;
        state.result = replaceZero(state.value);
        return;
      }

      state.value += value;
      state.result = replaceZero(state.value);
    },

    calculate(state) {
      const valuePrev = parseFloat(state.valuePrev.replace(',', '.'));
      const value = parseFloat(state.value.replace(',', '.'));
      let result;
      let resultStr;

      try {
        const operation = CALC_OPERATIONS[state.valueOperation];
        if (!operation) {
          state.result = ERROR_DISPLAY_TEXT;
          return;
        }
        result = operation(valuePrev, value);
      } catch (error) {
        state.result = ERROR_DISPLAY_TEXT;
        return;
      }

      resultStr = String(result);

      if (resultStr.length > 12) {
        resultStr = result.toFixed(3);
      }

      if (result > 999_999_999_999) {
        state.result = parseFloat(result.toFixed(3)).toExponential(9);
      } else {
        state.result = resultStr;
      }

      state.valuePrev = resultStr;
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
