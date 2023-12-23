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
  onClickButton?: (value: number | string) => void;
}>) {
  const handleClickButton = (item: string | number) => {
    if (onClickButton) {
      onClickButton(item);
    }
  };
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
