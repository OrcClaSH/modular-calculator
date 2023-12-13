import { selectCalcMode } from '@entities/calculator';

import { blockComponents } from '@shared/config/constants';
import { useAppSelector } from '@shared/model/hooks';
import { BlockLayout } from '@shared/ui/blocks';

import styles from './SourceCalcBlocks.module.scss';

export function SourceCalcBlocks({
  totalCalcBlocksIds,
}: Readonly<{
  totalCalcBlocksIds: number[];
}>) {
  const mode = useAppSelector(selectCalcMode);
  const sortedBlockComponents = [...blockComponents].sort((a, b) => b.id - a.id);

  return (
    <div className={styles.container}>
      {sortedBlockComponents.map((item) => (
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
