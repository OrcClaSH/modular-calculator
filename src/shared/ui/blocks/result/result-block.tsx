import styles from './ResultBlock.module.scss';

export function ResultBlock({
  value,
}: Readonly<{
  value?: number | string;
}>) {
  return <div className={styles.result}>{value ?? 0}</div>;
}
