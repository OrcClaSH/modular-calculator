import cn from 'classnames';
import { useState } from 'react';

// eslint-disable-next-line no-restricted-imports
import { MODE_ENUM } from '@widgets/source-calc-blocks/model/block-components';

import { BracketsImg, EyeImg } from '@shared/ui/img';

import styles from './ToggleMode.module.scss';

export function ToggleMode() {
  const [modeNow, setModeNow] = useState<MODE_ENUM>(MODE_ENUM.CONSTRUCTOR); // TODO store source

  const classNames = (modeItem: MODE_ENUM): string => {
    return cn(styles.button, { [styles.active]: modeNow === modeItem });
  };

  const handleClick = (modeItem: MODE_ENUM) => {
    setModeNow(modeItem);
  };

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={classNames(MODE_ENUM.RUNTIME)}
        onClick={() => handleClick(MODE_ENUM.RUNTIME)}
      >
        <EyeImg className={styles.image} /> Runtime
      </button>
      <button
        type="button"
        className={classNames(MODE_ENUM.CONSTRUCTOR)}
        onClick={() => handleClick(MODE_ENUM.CONSTRUCTOR)}
      >
        <BracketsImg className={styles.image} /> Constructor
      </button>
    </div>
  );
}
