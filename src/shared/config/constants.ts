import { ReactElement } from 'react';

import {
  EqualsBlock,
  NumberButtonsBlock,
  OperationBlock,
  DisplayBlock,
} from '@shared/ui/blocks';

export enum SizeEnum {
  SM = 'sm',
  MD = 'md',
  LG = 'lg',
}

export enum MODE_ENUM {
  RUNTIME = 'runtime',
  CONSTRUCTOR = 'constructor',
}

type DataFunction = (args: {
  disabled?: boolean;
  passive?: boolean;
  value?: number;
  mode?: MODE_ENUM;
  activeAnimation?: boolean;
  onClickButton?: (value: number | string) => void;
  handleClickEquals?: () => void;
}) => ReactElement;

export type SourceCalcBlockType = {
  id: number;
  name: string;
  data: DataFunction;
};

export const BLOCK_COMPONENTS: SourceCalcBlockType[] = [
  { id: 1, name: 'EqualsBlock', data: EqualsBlock },
  { id: 2, name: 'NumberButtonsBlock', data: NumberButtonsBlock },
  { id: 3, name: 'OperationBlock', data: OperationBlock },
  { id: 4, name: 'DisplayBlock', data: DisplayBlock },
].sort((a, b) => b.id - a.id);

export const DND_DISABLED = [4];

export const ERROR_DISPLAY_TEXT = 'Не определено';

export const CALC_OPERATIONS: { [key: string]: (a: number, b: number) => number } = {
  '+': (a, b) => a + b,
  '-': (a, b) => a - b,
  '/': (a, b) => {
    if (!b) throw new Error();
    return a / b;
  },
  x: (a, b) => a * b,
};

export const NUMBER_BUTTONS = ['7', '8', '9', '4', '5', '6', '1', '2', '3', '0', ','];
export const CALC_OPERATION_BUTTONS = ['/', 'x', '-', '+'];

export const MAX_DISPLAY_LENGTH = 11;
