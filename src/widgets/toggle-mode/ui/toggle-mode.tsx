import cn from 'classnames';

import { calcActions, selectCalcMode } from '@entities/calculator';

import { MODE_ENUM } from '@shared/config/constants';
import { useAppDispatch, useAppSelector } from '@shared/model/hooks';
import { BracketsImg, EyeImg } from '@shared/ui/img';

import styles from './ToggleMode.module.scss';

export function ToggleMode() {
  const dispatch = useAppDispatch();
  const modeNow = useAppSelector(selectCalcMode);

  const classNames = (modeItem: MODE_ENUM): string => {
    return cn(styles.button, { [styles.active]: modeNow === modeItem });
  };

  const handleClick = () => {
    dispatch(calcActions.toggleCalcMode());
  };

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={classNames(MODE_ENUM.RUNTIME)}
        onClick={() => handleClick()}
      >
        <EyeImg className={styles.image} /> Runtime
      </button>
      <button
        type="button"
        className={classNames(MODE_ENUM.CONSTRUCTOR)}
        onClick={() => handleClick()}
      >
        <BracketsImg className={styles.image} /> Constructor
      </button>
    </div>
  );
}
