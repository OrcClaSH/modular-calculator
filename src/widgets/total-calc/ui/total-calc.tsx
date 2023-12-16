import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import cn from 'classnames';

import { BlockLayout } from '@shared/ui/blocks';
import { DropLineImg } from '@shared/ui/img';

import { getBlock } from '../lib/get-block';
import { useTotalBlocks } from '../lib/hooks/useTotalBlocks';

import { DropzoneDescription } from './dropzone-description';
import styles from './TotalCalc.module.scss';

export function TotalCalc() {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
  );

  const {
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
  } = useTotalBlocks();

  return (
    <DndContext onDragEnd={onDragEnd} onDragStart={onDragStart} sensors={sensors}>
      <div
        className={cn(styles.container, { [styles.construct]: !isDropZoneEmpty })}
        ref={setNodeRef}
      >
        {isDropZoneEmpty && <DropzoneDescription active={isOver} />}
        <SortableContext
          items={totalCalcBlocksIds}
          strategy={verticalListSortingStrategy}
          disabled={isDndDisabled}
        >
          {totalCalcBlocksIds.map((blockId) => (
            <BlockLayout
              block={getBlock(blockId)}
              key={blockId}
              onDoubleClick={() => handleOnDoubleCLick(blockId)}
            />
          ))}
        </SortableContext>
        {isNeedDropLine && <DropLineImg />}
        <DragOverlay dropAnimation={null}>
          {activeBlock && <BlockLayout block={activeBlock} />}
        </DragOverlay>
      </div>
    </DndContext>
  );
}
