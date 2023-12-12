import { DndContext, DragOverlay } from '@dnd-kit/core';

import { SourceCalcBlocks, useBlocks } from '@widgets/source-calc-blocks';
import { ToggleMode } from '@widgets/toggle-mode';
import { TotalCalc } from '@widgets/total-calc';

import { MODE_ENUM } from '@shared/config/constants';
import { BlockLayout } from '@shared/ui/blocks';

import styles from './HomePage.module.scss';

export function HomePage() {
  const {
    totalCalcBlocks,
    setTotalCalcBlocks,
    activeBlock,
    totalCalcBlocksIds,
    onDragStart,
    onDragEnd,
    onDragOver,
  } = useBlocks();

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.head}>
          <ToggleMode />
        </div>
        <div className={styles.assembly}>
          <DndContext
            onDragStart={onDragStart}
            onDragOver={onDragOver}
            onDragEnd={onDragEnd}
          >
            <SourceCalcBlocks
              totalCalcBlocksIds={totalCalcBlocksIds}
              mode={MODE_ENUM.CONSTRUCTOR}
            />
            <TotalCalc
              totalCalcBlocks={totalCalcBlocks}
              totalCalcBlocksIds={totalCalcBlocksIds}
              setTotalCalcBlocks={setTotalCalcBlocks}
            />
            <DragOverlay dropAnimation={null}>
              {activeBlock && <BlockLayout block={activeBlock} />}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </main>
  );
}
