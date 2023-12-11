import { useDraggable } from '@dnd-kit/core';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import cn from 'classnames';

import styles from './ResultBlock.module.scss';

export function ResultBlock({
  value,
  disabled,
}: {
  value?: number | string;
  disabled?: boolean;
}) {
  return (
    <div className={cn(styles.result, { [styles.disabled]: disabled })}>{value || 0}</div>
  );
}
