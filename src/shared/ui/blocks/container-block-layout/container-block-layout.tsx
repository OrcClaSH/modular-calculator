import { PropsWithChildren } from 'react';

import styles from './ContainerBlockLayout.module.scss';

export function ContainerBlockLayout({ children }: PropsWithChildren) {
  return <div className={styles.container}>{children}</div>;
}
