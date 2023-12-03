import { SourceCalcBlocks } from '@widgets/source-calc-blocks';
import { ToggleMode } from '@widgets/toggle-mode';
import { TotalCalc } from '@widgets/total-calc';

import styles from './HomePage.module.scss';

export function HomePage() {
  return (
    <main className={styles.main}>
      <SourceCalcBlocks />
      <div className={styles.assembly}>
        <ToggleMode />
        <TotalCalc />
      </div>
    </main>
  );
}
