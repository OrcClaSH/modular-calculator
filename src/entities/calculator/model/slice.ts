import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { CALC_OPERATIONS, ERROR_DISPLAY_TEXT, MODE_ENUM } from '@shared/config/constants';

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

      if (typeof value === 'string' && CALC_OPERATIONS.includes(value)) {
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
        state.result = state.value;
        return;
      }

      if (state.isLastString) {
        state.value += value;
        state.isLastString = false;
        state.result = state.value;
        return;
      }

      state.value += value;
      state.result = state.value;
    },
    calculate(state) {
      try {
        const valuePrev = +state.valuePrev.replace(',', '.');
        const value = +state.value.replace(',', '.');

        switch (state.valueOperation) {
          case '+':
            state.result = `${valuePrev + value}`;
            return;
          case '-':
            state.result = `${valuePrev - value}`;
            return;
          case '/':
            if (!value) throw new Error();
            state.result = `${valuePrev / value}`;
            return;
          case 'x':
            state.result = `${valuePrev * value}`;
            return;
          default:
            return;
        }
      } catch {
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
