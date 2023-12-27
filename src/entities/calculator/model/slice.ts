import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import {
  CALC_OPERATIONS,
  ERROR_DISPLAY_TEXT,
  MAX_DISPLAY_LENGTH,
  MODE_ENUM,
} from '@shared/config/constants';
import { formationDisplayValue } from '@shared/lib/formation-display-value';
import { replaceComma } from '@shared/lib/replace-comma';

interface ICalcState {
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
  calcMode: MODE_ENUM.RUNTIME, // TODO
  totalCalcBlocksIds: [4, 3, 2, 1], // TODO
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
        if (state.isLastEqual) {
          state.valueOperation = value;
          state.value = '';
          state.isLastString = true;
          state.isLastEqual = false;
          return;
        }
        state.valueOperation = value;
        state.valuePrev = state.value;
        state.value = '';
        state.isLastString = true;
        state.isLastEqual = false;
        return;
      }

      if (value === ',') {
        const isDecimalInStateValue = state.value.includes(',');
        if (isDecimalInStateValue && !state.isLastEqual) {
          state.value += value;
        } else {
          state.value = '0,';
        }
        if (isDecimalInStateValue) {
          state.isLastEqual = false;
          return;
        }
        state.result = formationDisplayValue(state.value);
        state.isLastEqual = false;
        return;
      }

      if (state.isLastEqual) {
        state.valuePrev = state.value;
        state.value = value;
        state.result = formationDisplayValue(state.value);
        state.isLastEqual = false;
        return;
      }

      if (state.isLastString) {
        state.value += value;
        state.isLastString = false;
        state.result = formationDisplayValue(state.value);
        state.isLastEqual = false;
        return;
      }

      if (
        state.result.length > MAX_DISPLAY_LENGTH &&
        !Number.isNaN(Number(state.result)) &&
        !state.isLastEqual
      ) {
        state.isLastEqual = false;
        return;
      }

      state.value += value;
      state.result = formationDisplayValue(state.value);
      state.isLastEqual = false;
    },

    calculate(state) {
      const valuePrev = replaceComma(state.valuePrev);
      const value = replaceComma(state.value);

      try {
        const operation = CALC_OPERATIONS[state.valueOperation];
        if (!operation) {
          throw new Error(ERROR_DISPLAY_TEXT);
        }

        const result = Number(operation(valuePrev, value).toFixed(3));
        const resultStr = result.toString();

        const decimalSeparator = '.';
        const maxLength =
          MAX_DISPLAY_LENGTH - (resultStr.includes(decimalSeparator) ? 1 : 0);

        if (resultStr.length > maxLength) {
          state.result = result.toPrecision(maxLength);
        } else {
          state.result = resultStr;
        }

        state.valuePrev = resultStr;
        state.isLastEqual = true;
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
