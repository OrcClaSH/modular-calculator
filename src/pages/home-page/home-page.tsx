import { SourceCalcBlocks } from '@widgets/source-calc-blocks';
import { ToggleMode } from '@widgets/toggle-mode';
import { TotalCalc } from '@widgets/total-calc';

import styles from './HomePage.module.scss';

export function HomePage() {
  return (
    <main>
      <div className={styles.container}>
        <div className={styles.head}>
          <ToggleMode />
        </div>
        <div className={styles.assembly}>
          <SourceCalcBlocks />
          <TotalCalc />
        </div>
      </div>
    </main>
  );
}
