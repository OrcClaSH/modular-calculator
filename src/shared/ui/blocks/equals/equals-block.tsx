import { SizeEnum } from '@shared/config/constants';
import { Button } from '@shared/ui/buttons';

import { ContainerBlockLayout } from '..';

export function EqualsBlock({ disabled }: { disabled?: boolean }) {
  return (
    <ContainerBlockLayout>
      <Button size={SizeEnum.LG} disabled={disabled}>
        =
      </Button>
    </ContainerBlockLayout>
  );
}
