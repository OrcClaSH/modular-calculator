import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { CALC_OPERATIONS, ERROR_DISPLAY_TEXT, MODE_ENUM } from '@shared/config/constants';
import { removeLeadingZeros } from '@shared/lib/remove-leading-zeros';
import { replaceComma } from '@shared/lib/replace-comma';

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
        state.result = removeLeadingZeros(state.value);
        return;
      }

      if (state.isLastString) {
        state.value += value;
        state.isLastString = false;
        state.result = removeLeadingZeros(state.value);
        return;
      }

      state.value += value;
      state.result = removeLeadingZeros(state.value);
    },

    calculate(state) {
      const valuePrev = replaceComma(state.valuePrev);
      const value = replaceComma(state.value);

      try {
        const operation = CALC_OPERATIONS[state.valueOperation];
        if (!operation) {
          throw new Error(ERROR_DISPLAY_TEXT);
        }

        const result = operation(valuePrev, value);
        const resultStr = result.toString();

        const maxDisplayLength = 11;
        const decimalSeparator = '.';
        const maxLength =
          maxDisplayLength - (resultStr.includes(decimalSeparator) ? 1 : 0);

        if (resultStr.length > maxLength) {
          state.result = result.toPrecision(maxLength);
        } else {
          state.result = resultStr;
        }

        state.valuePrev = resultStr;
      } catch (error) {
        state.result = ERROR_DISPLAY_TEXT;
      }
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
