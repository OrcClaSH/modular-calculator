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

export type SourceCalcBlockType = {
  id: number;
  name: string;
  data: ({
    value,
    disabled,
  }: {
    value?: string | number;
    disabled?: boolean;
    mode?: MODE_ENUM;
  }) => JSX.Element;
};

export const blockComponents: SourceCalcBlockType[] = [
  { id: 1, name: 'EqualsBlock', data: EqualsBlock },
  { id: 2, name: 'NumberButtonsBlock', data: NumberButtonsBlock },
  { id: 3, name: 'OperationBlock', data: OperationBlock },
  { id: 4, name: 'ResultBlock', data: ResultBlock },
];
