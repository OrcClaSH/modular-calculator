import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

// eslint-disable-next-line import/no-restricted-paths
import { SourceCalcBlockType } from '@widgets/source-calc-blocks';

import styles from './BlockLayout.module.scss';

export function BlockLayout({
  block,
  disabled,
  ...props
}: {
  block: SourceCalcBlockType;
  disabled?: boolean;
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
      <Block disabled={disabled} />
    </div>
  );
}
