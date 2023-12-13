import { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core';
import { useMemo, useState } from 'react';

import { SourceCalcBlockType, blockComponents } from '@shared/config/constants';

export function useBlocks() {
  const [activeBlock, setActiveBlock] = useState<SourceCalcBlockType | null>(null);
  const [totalCalcBlocks, setTotalCalcBlocks] = useState<SourceCalcBlockType[]>([]);

  const totalCalcBlocksIds = useMemo(() => {
    return totalCalcBlocks.map((item) => item.id);
  }, [totalCalcBlocks]);

  const onDragStart = (event: DragStartEvent) => {
    console.log('start', { event });

    if (event.active.data.current?.type === 'SourceComponent') {
      blockComponents.forEach((block) => {
        if (event.active.data.current?.name === block.name) {
          setActiveBlock(block);
        }
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

    blockComponents.forEach((item) => {
      if (item.id === eventBlockId && !totalCalcBlocksIds.includes(eventBlockId)) {
        setTotalCalcBlocks((prev) => [...prev, item]);
      }
    });
  };

  return {
    activeBlock,
    totalCalcBlocks,
    setTotalCalcBlocks,
    totalCalcBlocksIds,
    onDragStart,
    onDragOver,
    onDragEnd,
  };
}
