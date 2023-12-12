// TODO
// eslint-disable-next-line no-restricted-imports, import/no-restricted-paths
import { MODE_ENUM } from '@widgets/source-calc-blocks/model/block-components';

import { SizeEnum } from '@shared/config/constants';
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
