import { SizeEnum } from '@shared/config/constants';
import { Button } from '@shared/ui/buttons';

import styles from './NumberButtonsBlock.module.scss';

const buttons = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0, ','];

export function NumberButtonsBlock({
  disabled,
  activeAnimation,
}: Readonly<{
  disabled?: boolean;
  activeAnimation?: boolean;
}>) {
  return (
    <div className={styles.buttons}>
      {buttons.map((item) => (
        <Button
          key={item}
          size={item !== 0 ? SizeEnum.SM : SizeEnum.MD}
          disabled={disabled}
          activeAnimation={activeAnimation}
        >
          {item}
        </Button>
      ))}
    </div>
  );
}
