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
  passive?: boolean;
  value?: number;
  mode?: MODE_ENUM;
  activeAnimation?: boolean;
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
  { id: 4, name: 'ResultBlock', data: ResultBlock },
].sort((a, b) => b.id - a.id);

export const DND_DISABLED = [4];
