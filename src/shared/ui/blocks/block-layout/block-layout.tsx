import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import cn from 'classnames';

import { MODE_ENUM, SourceCalcBlockType } from '@shared/config/constants';
import { DropLineImg } from '@shared/ui/img';

import styles from './BlockLayout.module.scss';

export function BlockLayout({
  block,
  notMoved,
  dndDisabled,
  passive,
  disabled,
  mode,
  activeAnimation,
  ...props
}: Readonly<{
  block: SourceCalcBlockType;
  notMoved?: boolean;
  dndDisabled?: boolean;
  passive?: boolean;
  disabled?: boolean;
  mode?: MODE_ENUM;
  activeAnimation?: boolean;
  onDoubleClick?: () => void;
}>) {
  const Block = block.data;
  const { attributes, listeners, setNodeRef, transform, transition, isDragging, active } =
    useSortable({
      id: block.id,
      disabled: dndDisabled,
      data: {
        type: 'SourceComponent',
        name: block.name,
        block,
      },
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
  };

  if (isDragging && active?.data?.current?.sortable.containerId !== 'Sortable') {
    return (
      <div ref={setNodeRef} style={style}>
        <DropLineImg />
      </div>
    );
  }

  return (
    <div
      className={cn(styles.container, {
        [styles.shadow]: notMoved,
        [styles.passive]: passive,
        [styles.move]: isDragging,
      })}
      ref={setNodeRef}
      style={style}
      {...props}
      {...attributes}
      {...listeners}
    >
      <Block
        disabled={disabled}
        passive={passive}
        mode={mode}
        activeAnimation={activeAnimation}
      />
    </div>
  );
}
