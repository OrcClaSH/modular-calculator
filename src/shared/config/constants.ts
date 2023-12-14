import { ReactElement } from 'react';

import {
  EqualsBlock,
  NumberButtonsBlock,
  OperationBlock,
  ResultBlock,
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
  mode?: MODE_ENUM;
  active?: boolean;
}) => ReactElement;

export type SourceCalcBlockType = {
  id: number;
  name: string;
  data: DataFunction;
};

export const blockComponents: SourceCalcBlockType[] = [
  { id: 1, name: 'EqualsBlock', data: EqualsBlock },
  { id: 2, name: 'NumberButtonsBlock', data: NumberButtonsBlock },
  { id: 3, name: 'OperationBlock', data: OperationBlock },
  { id: 4, name: 'ResultBlock', data: ResultBlock },
].sort((a, b) => b.id - a.id);
