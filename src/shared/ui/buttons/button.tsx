import cn from 'classnames';
import { ButtonHTMLAttributes } from 'react';

// eslint-disable-next-line no-restricted-imports, import/no-restricted-paths
import { MODE_ENUM } from '@widgets/source-calc-blocks/model/block-components';

import { SizeEnum } from '@shared/config/constants';

import styles from './Button.module.scss';

interface IButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  size?: SizeEnum;
  mode?: MODE_ENUM;
}

export function Button({ size, children, className, mode, ...props }: IButtonProps) {
  const classNames = cn(className, styles.button, styles[size || ''], {
    [styles.runtime]: mode === MODE_ENUM.RUNTIME,
  });

  return (
    <button type="button" {...props} className={classNames}>
      {children}
    </button>
  );
}
