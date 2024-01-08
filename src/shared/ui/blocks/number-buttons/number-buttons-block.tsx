import { useEffect } from 'react';

import { NUMBER_BUTTONS, SizeEnum } from '@shared/config/constants';
import { Button } from '@shared/ui/buttons';

import styles from './NumberButtonsBlock.module.scss';

export function NumberButtonsBlock({
  disabled,
  activeAnimation,
  onClickButton,
}: Readonly<{
  disabled?: boolean;
  activeAnimation?: boolean;
  onClickButton?: (value: string) => void;
}>) {
  const handleClickButton = (item: string) => {
    if (onClickButton) {
      onClickButton(item);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const { key } = event;

    if (!disabled && onClickButton && NUMBER_BUTTONS.includes(key)) {
      handleClickButton(key);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [disabled]);

  return (
    <div className={styles.buttons}>
      {NUMBER_BUTTONS.map((item) => (
        <Button
          key={item}
          size={item !== '0' ? SizeEnum.SM : SizeEnum.MD}
          disabled={disabled}
          activeAnimation={activeAnimation}
          onClick={() => handleClickButton(item)}
        >
          {item}
        </Button>
      ))}
    </div>
  );
}
