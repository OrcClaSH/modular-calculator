import styles from './DisplayBlock.module.scss';

export function DisplayBlock({
  value,
}: Readonly<{
  value?: number | string;
}>) {
  return <div className={styles.displayBlock}>{value ?? 0}</div>;
}
