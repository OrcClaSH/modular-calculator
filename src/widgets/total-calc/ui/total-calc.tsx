import { DndContext } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import cn from 'classnames';

import { BlockLayout } from '@shared/ui/blocks';

import { getBlock } from '../lib/get-block';
import { useTotalBlocks } from '../lib/hooks/useTotalBlocks';

import { DropzoneDescription } from './dropzone-description';
import styles from './TotalCalc.module.scss';

export function TotalCalc() {
  const {
    isOver,
    onDragEnd,
    setNodeRef,
    isDndDisabled,
    isDropZoneEmpty,
    totalCalcBlocksIds,
    handleOnDoubleCLick,
  } = useTotalBlocks();

  return (
    <DndContext onDragEnd={onDragEnd}>
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
      </div>
    </DndContext>
  );
}
