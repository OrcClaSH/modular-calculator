import cn from 'classnames';
import { ButtonHTMLAttributes } from 'react';

import { SizeEnum } from '@shared/config/constants';

import styles from './Button.module.scss';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: SizeEnum;
  isPressed?: boolean;
  activeAnimation?: boolean;
}

export function Button({
  size,
  children,
  className,
  isPressed,
  activeAnimation,
  ...props
}: Readonly<IButtonProps>) {
  const classNames = cn(className, styles.button, styles[size ?? ''], {
    [styles.active]: activeAnimation,
    [styles.pressKeyboard]: isPressed,
  });

  return (
    <button type="button" {...props} className={classNames}>
      {children}
    </button>
  );
}
