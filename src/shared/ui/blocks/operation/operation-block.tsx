import { useEffect, useState } from 'react';

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
  onClickButton?: (value: string) => void;
}>) {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const handleClickButton = (item: string) => {
    if (onClickButton) {
      onClickButton(item);
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    const key = event.key !== '*' ? event.key : 'x';

    if (!disabled && onClickButton && CALC_OPERATION_BUTTONS.includes(key)) {
      onClickButton(key);
      setActiveKey(key);

      setTimeout(() => {
        setActiveKey(null);
      }, 100);
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [disabled]);

  return (
    <div className={styles.buttons}>
      {CALC_OPERATION_BUTTONS.map((operator) => (
        <Button
          key={operator}
          onClick={() => handleClickButton(operator)}
          disabled={disabled}
          activeAnimation={activeAnimation}
          isPressed={activeKey === operator}
        >
          {operator}
        </Button>
      ))}
    </div>
  );
}
