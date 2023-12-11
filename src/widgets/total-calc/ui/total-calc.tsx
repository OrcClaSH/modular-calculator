import { DndContext, DragEndEvent, useDroppable } from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import cn from 'classnames';

// TODO
// eslint-disable-next-line import/no-restricted-paths
import { SourceCalcBlockType } from '@widgets/source-calc-blocks';

import { BlockLayout } from '@shared/ui/blocks';

import { DropzoneDescription } from './dropzone-description';
import styles from './TotalCalc.module.scss';

export function TotalCalc({
  totalCalcBlocks,
  totalCalcBlocksIds,
  setTotalCalcBlocks,
}: {
  totalCalcBlocks: SourceCalcBlockType[];
  totalCalcBlocksIds: number[];
  setTotalCalcBlocks: React.Dispatch<React.SetStateAction<SourceCalcBlockType[]>>;
}) {
  const isDragZoneEmpty = totalCalcBlocks.length === 0;

  const { isOver, setNodeRef } = useDroppable({
    id: 'droppable',
  });

  const onDragEnd = (event: DragEndEvent) => {
    console.log('Dropzone dragEndEvent', { event });

    const { active, over } = event;
    if (!over || active.id === over.id) {
      return;
    }

    setTotalCalcBlocks((blocks) => {
      const activeBlockIndex = blocks.findIndex((item) => item.id === active.id);
      const overBlockIndex = blocks.findIndex((item) => item.id === over.id);

      return arrayMove(totalCalcBlocks, activeBlockIndex, overBlockIndex);
    });
  };

  const handleOnDoubleCLick = (id: number) => {
    setTotalCalcBlocks((prev) => prev.filter((block) => block.id !== id));
  };

  return (
    <DndContext onDragEnd={onDragEnd}>
      <div
        className={cn(styles.container, { [styles.construct]: !isDragZoneEmpty })}
        ref={setNodeRef}
      >
        {isDragZoneEmpty && <DropzoneDescription active={isOver} />}
        <SortableContext
          items={totalCalcBlocksIds}
          strategy={verticalListSortingStrategy}
        >
          {totalCalcBlocks.map((block) => (
            <BlockLayout
              block={block}
              key={block.id}
              onDoubleClick={() => handleOnDoubleCLick(block.id)}
            />
          ))}
        </SortableContext>
      </div>
    </DndContext>
  );
}
