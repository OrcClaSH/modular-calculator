import { CALC_OPERATION_BUTTONS } from '@shared/config/constants';
import { Button } from '@shared/ui/buttons';

import styles from './OperationBlock.module.scss';

export function OperationBlock({
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
      {CALC_OPERATION_BUTTONS.map((operator) => (
        <Button
          key={operator}
          onClick={() => handleClickButton(operator)}
          disabled={disabled}
          activeAnimation={activeAnimation}
        >
          {operator}
        </Button>
      ))}
    </div>
  );
}
