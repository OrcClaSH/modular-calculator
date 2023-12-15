import { MODE_ENUM, SizeEnum } from '@shared/config/constants';
import { Button } from '@shared/ui/buttons';

export function EqualsBlock({
  disabled,
}: Readonly<{
  disabled?: boolean;
}>) {
  return (
    <Button size={SizeEnum.LG} disabled={disabled}>
      =
    </Button>
  );
}
