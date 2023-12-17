import { DragEndEvent, DragStartEvent, useDroppable } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';
import { useEffect, useState } from 'react';

import { calcActions, selectCalcMode } from '@entities/calculator';

import {
  MODE_ENUM,
  SourceCalcBlockType,
  BLOCK_COMPONENTS,
} from '@shared/config/constants';
import { useAppDispatch, useAppSelector } from '@shared/model/hooks';

export function useTotalBlocks() {
  const dispatch = useAppDispatch();
  const totalCalcBlocksIds = useAppSelector((state) => state.calc.totalCalcBlocksIds);
  const [activeBlock, setActiveBlock] = useState<SourceCalcBlockType | null>(null);

  const isDropZoneEmpty = totalCalcBlocksIds.length === 0;
  const mode = useAppSelector(selectCalcMode);
  const isDndDisabled = mode === MODE_ENUM.RUNTIME;

  const { isOver, setNodeRef, active, over } = useDroppable({
    id: 'droppable',
  });

  const isNeedDropLine =
    active?.data?.current?.type === 'SourceComponent' &&
    over?.id === 'droppable' &&
    !isDropZoneEmpty;

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
    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }

    const activeBlockIndex = totalCalcBlocksIds.findIndex(
      (blockId) => blockId === active.id,
    );
    const overBlockIndex = totalCalcBlocksIds.findIndex((blockId) => blockId === over.id);
    dispatch(
      calcActions.setTotalCalcBlocksIds(
        arrayMove(totalCalcBlocksIds, activeBlockIndex, overBlockIndex),
      ),
    );
  };

  const handleOnDoubleCLick = (id: number) => {
    if (mode === MODE_ENUM.RUNTIME) return;

    const totalCalcBlocksIdsFiltered = totalCalcBlocksIds.filter(
      (blockId) => blockId !== id,
    );
    dispatch(calcActions.setTotalCalcBlocksIds(totalCalcBlocksIdsFiltered));
  };

  return {
    over,
    active,
    isOver,
    onDragEnd,
    setNodeRef,
    activeBlock,
    onDragStart,
    isDndDisabled,
    isNeedDropLine,
    isDropZoneEmpty,
    totalCalcBlocksIds,
    handleOnDoubleCLick,
  };
}
