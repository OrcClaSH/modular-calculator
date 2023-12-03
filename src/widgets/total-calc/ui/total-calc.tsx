import { DropzoneDescription } from './dropzone-description/dropzone-description';
import styles from './TotalCalc.module.scss';

export function TotalCalc() {
  return (
    <div className={styles.container}>
      <div className={styles.description}>
        <DropzoneDescription />
      </div>
    </div>
  );
}
