import { BlockLayout } from '@shared/ui/blocks';

import { MODE_ENUM, blockComponents } from '../model/block-components';

import styles from './SourceCalcBlocks.module.scss';

export function SourceCalcBlocks({
  totalCalcBlocksIds,
  mode,
}: {
  totalCalcBlocksIds: number[];
  mode?: MODE_ENUM;
}) {
  return (
    <div className={styles.container}>
      {blockComponents
        .sort((a, b) => b.id - a.id)
        .map((item) => (
          <BlockLayout
            key={item.id}
            block={item}
            disabled={totalCalcBlocksIds.includes(item.id)}
            mode={mode}
          />
        ))}
    </div>
  );
}
