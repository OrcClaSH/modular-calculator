import cn from 'classnames';

import { useAppSelector } from '@shared/model/hooks';

import styles from './DisplayBlock.module.scss';

export function DisplayBlock() {
  const value = useAppSelector((state) => state.calc.result);
  return (
    <div className={cn(styles.displayBlock, { [styles.lg]: !value })}>{value || 0}</div>
  );
}
