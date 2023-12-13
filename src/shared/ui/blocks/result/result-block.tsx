import cn from 'classnames';

import styles from './ResultBlock.module.scss';

export function ResultBlock({
  value,
  disabled,
}: Readonly<{
  value?: number | string;
  disabled?: boolean;
}>) {
  return (
    <div className={cn(styles.result, { [styles.disabled]: disabled })}>{value || 0}</div>
  );
}
