import {
  DndContext,
  DragOverlay,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';

import { ToggleMode } from '@widgets/toggle-mode';

import { SourceCalcBlocks, useSourceBlocks } from '@features/source-calc-blocks';
import { TotalCalc } from '@features/total-calc';

import { BlockLayout } from '@shared/ui/blocks';

import styles from './HomePage.module.scss';

export function HomePage() {
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 3,
      },
    }),
  );

  const { activeBlock, onDragStart, onDragEnd } = useSourceBlocks();

  return (
    <main>
      <div className={styles.container}>
        <div className={styles.head}>
          <ToggleMode />
        </div>
        <div className={styles.assembly}>
          <DndContext sensors={sensors} onDragStart={onDragStart} onDragEnd={onDragEnd}>
            <SourceCalcBlocks />
            <TotalCalc />
            <DragOverlay dropAnimation={null}>
              {activeBlock && <BlockLayout block={activeBlock} />}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </main>
  );
}
