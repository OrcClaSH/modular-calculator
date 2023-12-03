import { DropZoneImg } from '@shared/ui/img';

import styles from './DropzoneDescription.module.scss';

export function DropzoneDescription() {
  return (
    <div className={styles.container}>
      <DropZoneImg className={styles.img} />
      <h4 className={styles.title}>Перетащите сюда</h4>
      <p className={styles.text}>любой элемент</p>
      <p className={styles.text}>из левой панели</p>
    </div>
  );
}
