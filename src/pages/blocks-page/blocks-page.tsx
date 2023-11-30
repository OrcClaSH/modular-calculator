import {
  EqualsBlock,
  NumberButtonsBlock,
  OperationBlock,
  ResultBlock,
} from '@shared/ui/blocks';

import styles from './BlockPage.module.scss';

export function BlocksPage() {
  return (
    <div className={styles.container}>
      <ResultBlock value={0} />
      <OperationBlock />
      <NumberButtonsBlock />
      <EqualsBlock />
    </div>
  );
}
