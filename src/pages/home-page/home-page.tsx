import { SourceCalcBlocks } from '@widgets/source-calc-blocks';
import { ToggleMode } from '@widgets/toggle-mode';

import styles from './HomePage.module.scss';

export function HomePage() {
  return (
    <main className={styles.main}>
      <SourceCalcBlocks />
      <ToggleMode />
    </main>
  );
}
