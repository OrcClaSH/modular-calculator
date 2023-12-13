import { MODE_ENUM } from '@shared/config/constants';
import { Button } from '@shared/ui/buttons';

import styles from './OperationBlock.module.scss';

const operations = {
  '/': () => console.log('click'),
  x: () => console.log('click'),
  '-': () => console.log('click'),
  '+': () => console.log('click'),
};

export function OperationBlock({
  disabled,
  mode,
}: Readonly<{
  disabled?: boolean;
  mode?: MODE_ENUM;
}>) {
  return (
    <div className={styles.buttons}>
      {Object.entries(operations).map(([k, v]) => (
        <Button key={k} onClick={v} disabled={disabled} mode={mode}>
          {k}
        </Button>
      ))}
    </div>
  );
}
