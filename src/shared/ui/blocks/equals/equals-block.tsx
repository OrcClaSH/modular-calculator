import { useEffect, useState } from 'react';

import { SizeEnum } from '@shared/config/constants';
import { Button } from '@shared/ui/buttons';

export function EqualsBlock({
  disabled,
  activeAnimation,
  handleClickEquals,
}: Readonly<{
  disabled?: boolean;
  activeAnimation?: boolean;
  handleClickEquals?: () => void;
}>) {
  const [activeKey, setActiveKey] = useState<string | null>(null);

  const handleKeyDown = (event: KeyboardEvent) => {
    const { key } = event;

    if (!disabled && handleClickEquals && (key === '=' || key === 'Enter')) {
      handleClickEquals();
      setActiveKey('=');

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
    <Button
      size={SizeEnum.LG}
      disabled={disabled}
      activeAnimation={activeAnimation}
      onClick={handleClickEquals}
      isPressed={activeKey === '='}
    >
      =
    </Button>
  );
}
