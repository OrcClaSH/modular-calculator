import {
  EqualsBlock,
  NumberButtonsBlock,
  OperationBlock,
  ResultBlock,
} from '@shared/ui/blocks';

import styles from './SourceCalcBlocks.module.scss';

export function SourceCalcBlocks() {
  return (
    <div className={styles.container}>
      <ResultBlock value={0} />
      <OperationBlock />
      <NumberButtonsBlock />
      <EqualsBlock />
    </div>
  );
}
