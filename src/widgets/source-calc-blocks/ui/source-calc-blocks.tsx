import { selectCalcMode, selectTotalCalcBlocksIds } from '@entities/calculator';

import { MODE_ENUM, blockComponents } from '@shared/config/constants';
import { useAppSelector } from '@shared/model/hooks';
import { BlockLayout } from '@shared/ui/blocks';

import styles from './SourceCalcBlocks.module.scss';

export function SourceCalcBlocks() {
  const mode = useAppSelector(selectCalcMode);
  const totalCalcBlocksIds = useAppSelector(selectTotalCalcBlocksIds);

  const dndDisabled = () => {
    return mode === MODE_ENUM.RUNTIME;
  };

  return (
    <div className={styles.container}>
      {blockComponents.map((block) => (
        <BlockLayout
          key={block.id}
          block={block}
          disabled={totalCalcBlocksIds.includes(block.id)}
          dndDisabled={dndDisabled()}
          mode={mode}
        />
      ))}
    </div>
  );
}
