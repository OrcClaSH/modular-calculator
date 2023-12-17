import { SizeEnum } from '@shared/config/constants';
import { Button } from '@shared/ui/buttons';

export function EqualsBlock({
  disabled,
  activeAnimation,
}: Readonly<{
  disabled?: boolean;
  activeAnimation?: boolean;
}>) {
  return (
    <Button size={SizeEnum.LG} disabled={disabled} activeAnimation={activeAnimation}>
      =
    </Button>
  );
}
