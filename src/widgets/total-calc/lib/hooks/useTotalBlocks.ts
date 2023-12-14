import { DragEndEvent, useDroppable } from '@dnd-kit/core';
import { arrayMove } from '@dnd-kit/sortable';

import { calcActions, selectCalcMode } from '@entities/calculator';

import { MODE_ENUM } from '@shared/config/constants';
import { useAppDispatch, useAppSelector } from '@shared/model/hooks';

export function useTotalBlocks() {
  const dispatch = useAppDispatch();
  const totalCalcBlocksIds = useAppSelector((state) => state.calc.totalCalcBlocksIds);

  const isDropZoneEmpty = totalCalcBlocksIds.length === 0;
  const mode = useAppSelector(selectCalcMode);
  const isDndDisabled = mode === MODE_ENUM.RUNTIME;

  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable',
  });

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
    const totalCalcBlocksIdsFiltered = totalCalcBlocksIds.filter(
      (blockId) => blockId !== id,
    );
    dispatch(calcActions.setTotalCalcBlocksIds(totalCalcBlocksIdsFiltered));
  };

  return {
    isOver,
    onDragEnd,
    setNodeRef,
    isDropZoneEmpty,
    totalCalcBlocksIds,
    isDndDisabled,
    handleOnDoubleCLick,
  };
}
