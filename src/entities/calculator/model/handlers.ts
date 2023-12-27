import {
  CALC_OPERATIONS,
  ERROR_DISPLAY_TEXT,
  MAX_DISPLAY_LENGTH,
} from '@shared/config/constants';
import { formationDisplayValue } from '@shared/lib/formation-display-value';
import { replaceComma } from '@shared/lib/replace-comma';

import { ICalcState } from './slice';

export function handleLastString(state: ICalcState, value: string) {
  if (!state.isLastEqual) {
    state.valuePrev = state.value;
  }
  state.valueOperation = value;
  state.value = '';
  state.isLastString = true;
  state.isLastEqual = false;
}

export function handleLastEqual(state: ICalcState, value: string) {
  if (value === ',') {
    const isDecimalInStateValue = state.value.includes(',');

    if (isDecimalInStateValue && !state.isLastEqual) {
      state.isLastEqual = false;
      return;
    }

    if (state.value && !isDecimalInStateValue) {
      state.value += value;
    }
    if (state.isLastEqual) {
      state.value = '0,';
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

  if (state.result.length > MAX_DISPLAY_LENGTH && !Number.isNaN(Number(state.result))) {
    return;
  }

  state.value += value;
  state.result = formationDisplayValue(state.value);
  state.isLastEqual = false;
}

export function handleCalculate(state: ICalcState) {
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
    const maxLength = MAX_DISPLAY_LENGTH - (resultStr.includes(decimalSeparator) ? 1 : 0);

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
}
