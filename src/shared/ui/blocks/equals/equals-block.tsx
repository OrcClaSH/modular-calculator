import { SizeEnum } from '@shared/config/constants';
import { Button } from '@shared/ui/buttons';

export function EqualsBlock({ disabled }: { disabled?: boolean }) {
  return (
    <Button size={SizeEnum.LG} disabled={disabled}>
      =
    </Button>
  );
}
