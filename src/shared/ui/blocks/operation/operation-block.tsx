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
  activeAnimation,
}: Readonly<{
  disabled?: boolean;
  activeAnimation?: boolean;
}>) {
  return (
    <div className={styles.buttons}>
      {Object.entries(operations).map(([k, v]) => (
        <Button key={k} onClick={v} disabled={disabled} activeAnimation={activeAnimation}>
          {k}
        </Button>
      ))}
    </div>
  );
}
