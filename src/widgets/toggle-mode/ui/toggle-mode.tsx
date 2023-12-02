import cn from 'classnames';
import { useState } from 'react';

import { BracketsImg, EyeImg } from '@shared/ui/img';

import styles from './ToggleMode.module.scss';

type ModeType = 'runtime' | 'constructor';

export function ToggleMode() {
  const [modeNow, setModeNow] = useState<ModeType>('constructor'); // TODO store source

  const classNames = (modeItem: ModeType): string => {
    return cn(styles.button, { [styles.active]: modeNow === modeItem });
  };

  const handleClick = (modeItem: ModeType) => {
    setModeNow(modeItem);
  };

  return (
    <div className={styles.container}>
      <button
        type="button"
        className={classNames('runtime')}
        onClick={() => handleClick('runtime')}
      >
        <EyeImg className={styles.image} /> Runtime
      </button>
      <button
        type="button"
        className={classNames('constructor')}
        onClick={() => handleClick('constructor')}
      >
        <BracketsImg className={styles.image} /> Constructor
      </button>
    </div>
  );
}
