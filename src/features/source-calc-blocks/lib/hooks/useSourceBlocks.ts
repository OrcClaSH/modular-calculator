import { DragEndEvent, DragStartEvent } from '@dnd-kit/core';
import { useState } from 'react';

import { calcActions, selectTotalCalcBlocksIds } from '@entities/calculator';

import {
  SourceCalcBlockType,
  BLOCK_COMPONENTS,
  DND_DISABLED,
} from '@shared/config/constants';
import { useAppDispatch, useAppSelector } from '@shared/model/hooks';

export function useSourceBlocks() {
  const dispatch = useAppDispatch();
  const totalCalcBlocksIds = useAppSelector(selectTotalCalcBlocksIds);
  const [activeBlock, setActiveBlock] = useState<SourceCalcBlockType | null>(null);

  const onDragStart = (event: DragStartEvent) => {
    if (event.active.data.current?.type === 'SourceComponent') {
      BLOCK_COMPONENTS.forEach((block) => {
        if (event.active.data.current?.name === block.name) {
          setActiveBlock(block);
        }
      });
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    setActiveBlock(null);

    if (event.over?.id !== 'droppable') {
      return;
    }

    const eventBlockId = event.active.id;

    BLOCK_COMPONENTS.forEach((item) => {
      if (item.id === eventBlockId && !totalCalcBlocksIds.includes(eventBlockId)) {
        if (DND_DISABLED.includes(eventBlockId)) {
          dispatch(calcActions.setTotalCalcBlocksIds([item.id, ...totalCalcBlocksIds]));
        } else {
          dispatch(calcActions.setTotalCalcBlocksIds([...totalCalcBlocksIds, item.id]));
        }
      }
    });
  };

  return {
    activeBlock,
    onDragStart,
    onDragEnd,
  };
}
