import { Button } from '@shared/ui/buttons';

import { ContainerBlockLayout } from '../container-block-layout/container-block-layout';

import styles from './OperationBlock.module.scss';

const operations = {
  '/': () => console.log('click'),
  x: () => console.log('click'),
  '-': () => console.log('click'),
  '+': () => console.log('click'),
};

export function OperationBlock({ disabled }: { disabled?: boolean }) {
  return (
    <ContainerBlockLayout>
      <div className={styles.buttons}>
        {Object.entries(operations).map(([k, v]) => (
          <Button key={k} onClick={v} disabled={disabled}>
            {k}
          </Button>
        ))}
      </div>
    </ContainerBlockLayout>
  );
}
