import cn from 'classnames';

import { DropZoneImg } from '@shared/ui/img';

import styles from './DropzoneDescription.module.scss';

export function DropzoneDescription({ active }: Readonly<{ active: boolean }>) {
  return (
    <div className={cn(styles.container, { [styles.active]: active })}>
      <DropZoneImg className={styles.img} />
      <h4 className={styles.title}>Перетащите сюда</h4>
      <p className={styles.text}>любой элемент</p>
      <p className={styles.text}>из левой панели</p>
    </div>
  );
}
