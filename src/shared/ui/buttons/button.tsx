import cn from 'classnames';
import { ButtonHTMLAttributes } from 'react';

import { MODE_ENUM, SizeEnum } from '@shared/config/constants';

import styles from './Button.module.scss';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: SizeEnum;
  mode?: MODE_ENUM;
}

export function Button({
  size,
  children,
  className,
  mode,
  ...props
}: Readonly<IButtonProps>) {
  const classNames = cn(className, styles.button, styles[size || ''], {
    [styles.runtime]: mode === MODE_ENUM.RUNTIME,
  });

  return (
    <button type="button" {...props} className={classNames}>
      {children}
    </button>
  );
}
