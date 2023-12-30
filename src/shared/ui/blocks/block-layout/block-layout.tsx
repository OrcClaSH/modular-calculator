import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import cn from 'classnames';

import { DND_DISABLED, MODE_ENUM, SourceCalcBlockType } from '@shared/config/constants';
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
  cursorNoDrop,
  onClickButton,
  onDoubleClick,
  handleClickEquals,
  ...props
}: Readonly<{
  block: SourceCalcBlockType;
  notMoved?: boolean;
  dndDisabled?: boolean;
  passive?: boolean;
  disabled?: boolean;
  mode?: MODE_ENUM;
  activeAnimation?: boolean;
  cursorNoDrop?: boolean;
  onClickButton?: (value: string) => void;
  onDoubleClick?: () => void;
  handleClickEquals?: () => void;
}>) {
  const Block = block.data;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
    active,
    over,
  } = useSortable({
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
    const classNames = DND_DISABLED.includes(over?.data?.current?.block.id)
      ? styles.error
      : '';
    return (
      <div ref={setNodeRef} style={style}>
        <DropLineImg className={classNames} />
      </div>
    );
  }

  const classNames = cn(styles.container, {
    [styles.draggable]: !activeAnimation,
    [styles.noDraggable]: cursorNoDrop,
    [styles.notMoved]: notMoved,
    [styles.passive]: passive,
    [styles.move]: isDragging,
  });

  return (
    <div
      className={classNames}
      ref={setNodeRef}
      style={style}
      onDoubleClick={onDoubleClick}
      {...props}
      {...attributes}
      {...listeners}
    >
      <Block
        disabled={disabled}
        passive={passive}
        mode={mode}
        activeAnimation={activeAnimation}
        onClickButton={onClickButton}
        handleClickEquals={handleClickEquals}
      />
    </div>
  );
}
