import { selectCalcMode, selectTotalCalcBlocksIds } from '@entities/calculator';

import { MODE_ENUM, blockComponents } from '@shared/config/constants';
import { useAppSelector } from '@shared/model/hooks';
import { BlockLayout } from '@shared/ui/blocks';

import styles from './SourceCalcBlocks.module.scss';

export function SourceCalcBlocks() {
  const mode = useAppSelector(selectCalcMode);
  const totalCalcBlocksIds = useAppSelector(selectTotalCalcBlocksIds);

  const blockComponentsShow = mode === MODE_ENUM.CONSTRUCTOR;
  const isDisabled = (blockId: number) => {
    return totalCalcBlocksIds.includes(blockId) || !blockComponentsShow;
  };

  return (
    <div className={styles.container}>
      {blockComponentsShow &&
        blockComponents.map((block) => (
          <BlockLayout
            key={block.id}
            block={block}
            disabled
            dndDisabled={isDisabled(block.id)}
            notMoved={!isDisabled(block.id)}
            passive={isDisabled(block.id)}
            activeAnimation={false}
            mode={mode}
          />
        ))}
    </div>
  );
}
