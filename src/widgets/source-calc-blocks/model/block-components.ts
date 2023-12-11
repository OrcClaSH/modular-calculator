import {
  EqualsBlock,
  NumberButtonsBlock,
  OperationBlock,
  ResultBlock,
} from '@shared/ui/blocks';

export type SourceCalcBlockType = {
  id: number;
  name: string;
  data: ({
    value,
    disabled,
  }: {
    value?: string | number | undefined;
    disabled?: boolean | undefined;
  }) => JSX.Element;
};

export const blockComponents: SourceCalcBlockType[] = [
  { id: 1, name: 'EqualsBlock', data: EqualsBlock },
  { id: 2, name: 'NumberButtonsBlock', data: NumberButtonsBlock },
  { id: 3, name: 'OperationBlock', data: OperationBlock },
  { id: 4, name: 'ResultBlock', data: ResultBlock },
];
