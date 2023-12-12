import { MODE_ENUM, SizeEnum } from '@shared/config/constants';
import { Button } from '@shared/ui/buttons';

export function EqualsBlock({
  disabled,
  mode,
}: {
  disabled?: boolean;
  mode?: MODE_ENUM;
}) {
  return (
    <Button size={SizeEnum.LG} disabled={disabled} mode={mode}>
      =
    </Button>
  );
}
