import cn from 'classnames';

import { ContainerBlockLayout } from '../container-block-layout/container-block-layout';

import styles from './ResultBlock.module.scss';

export function ResultBlock({
  value,
  disabled,
}: {
  value?: number | string;
  disabled?: boolean;
}) {
  return (
    <ContainerBlockLayout>
      <div className={cn(styles.result, { [styles.disabled]: disabled })}>
        {value || 0}
      </div>
    </ContainerBlockLayout>
  );
}
