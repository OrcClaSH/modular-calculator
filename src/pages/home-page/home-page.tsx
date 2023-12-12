/* eslint-disable no-restricted-imports */
import {
  DndContext,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import { useMemo, useState } from 'react';

import {
  SourceCalcBlockType,
  SourceCalcBlocks,
  blockComponents,
} from '@widgets/source-calc-blocks';
import { MODE_ENUM } from '@widgets/source-calc-blocks/model/block-components';
import { ToggleMode } from '@widgets/toggle-mode';
import { TotalCalc } from '@widgets/total-calc';

import { BlockLayout } from '@shared/ui/blocks';

import styles from './HomePage.module.scss';

export function HomePage() {
  const [activeBlock, setActiveBlock] = useState<SourceCalcBlockType | null>(null);
  const [totalCalcBlocks, setTotalCalcBlocks] = useState<SourceCalcBlockType[]>([]);

  const totalCalcBlocksIds = useMemo(() => {
    return totalCalcBlocks.map((item) => item.id);
  }, [totalCalcBlocks]);

  const onDragStart = (event: DragStartEvent) => {
    console.log('start', { event });

    if (event.active.data.current?.type === 'SourceComponent') {
      blockComponents.map((block) => {
        if (event.active.data.current?.name === block.name) {
          setActiveBlock(block);
        }
        return;
      });
    }
  };

  const onDragOver = (event: DragOverEvent) => {
    console.log('over', { event });
  };

  const onDragEnd = (event: DragEndEvent) => {
    console.log('end', { event });
    setActiveBlock(null);

    if (event.over?.id !== 'droppable') {
      return;
    }

    const eventBlockId = event.active.id;

    blockComponents.map((item) => {
      if (item.id === eventBlockId && !totalCalcBlocksIds.includes(eventBlockId)) {
        setTotalCalcBlocks((prev) => [...prev, item]);
      }
      return false;
    });
  };

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
