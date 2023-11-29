import cn from 'classnames';
import { ButtonHTMLAttributes } from 'react';

import { SizeEnum } from '@shared/config/constants';

import styles from './Button.module.scss';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: SizeEnum;
}

export function Button({
  size = SizeEnum.SM,
  children,
  className,
  ...props
}: IButtonProps) {
  return (
    <button
      type="button"
      {...props}
      className={cn(className, styles.button, styles[size])}
    >
      {children}
    </button>
  );
}
