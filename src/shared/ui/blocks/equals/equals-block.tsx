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
