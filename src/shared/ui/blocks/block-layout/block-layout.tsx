import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { MODE_ENUM, SourceCalcBlockType } from '@shared/config/constants';
import { DropLineImg } from '@shared/ui/img';

import styles from './BlockLayout.module.scss';

export function BlockLayout({
  block,
  disabled,
  dndDisabled,
  mode,
  ...props
}: Readonly<{
  block: SourceCalcBlockType;
  disabled?: boolean;
  dndDisabled?: boolean;
  mode?: MODE_ENUM;
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
      className={styles.container}
      ref={setNodeRef}
      style={style}
      {...props}
      {...attributes}
      {...listeners}
    >
      <Block disabled={disabled} mode={mode} />
    </div>
  );
}
