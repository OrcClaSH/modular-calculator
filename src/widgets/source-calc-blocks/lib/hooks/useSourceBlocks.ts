import { DragEndEvent, DragOverEvent, DragStartEvent } from '@dnd-kit/core';
import { useState } from 'react';

import { calcActions, selectTotalCalcBlocksIds } from '@entities/calculator';

import { SourceCalcBlockType, blockComponents } from '@shared/config/constants';
import { useAppDispatch, useAppSelector } from '@shared/model/hooks';

export function useSourceBlocks() {
  const dispatch = useAppDispatch();
  const totalCalcBlocksIds = useAppSelector(selectTotalCalcBlocksIds);
  const [activeBlock, setActiveBlock] = useState<SourceCalcBlockType | null>(null);

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
        dispatch(calcActions.setTotalCalcBlocksIds([...totalCalcBlocksIds, item.id]));
      }
    });
  };

  return {
    activeBlock,
    onDragStart,
    onDragOver,
    onDragEnd,
  };
}