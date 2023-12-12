/* eslint-disable no-restricted-imports */
/* eslint-disable import/no-restricted-paths */
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

import { SourceCalcBlockType } from '@widgets/source-calc-blocks';
import { MODE_ENUM } from '@widgets/source-calc-blocks/model/block-components';

import styles from './BlockLayout.module.scss';

export function BlockLayout({
  block,
  disabled,
  mode,
  ...props
}: {
  block: SourceCalcBlockType;
  disabled?: boolean;
  mode?: MODE_ENUM;
  onDoubleClick?: () => void;
}) {
  const Block = block.data;
  const { attributes, listeners, setNodeRef, transform } = useSortable({
    id: block.id,
    disabled,
    data: {
      type: 'SourceComponent',
      name: block.name,
      block,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
  };

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
