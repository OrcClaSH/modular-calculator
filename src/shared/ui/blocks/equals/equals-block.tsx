import { useEffect } from 'react';

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
  const handleKeyDown = (event: KeyboardEvent) => {
    const { key } = event;

    if (!disabled && handleClickEquals && key === '=') {
      handleClickEquals();
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
    >
      =
    </Button>
  );
}
