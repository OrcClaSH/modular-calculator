import { SourceCalcBlockType, BLOCK_COMPONENTS } from '@shared/config/constants';

export const getBlock = (blockId: number) => {
  return BLOCK_COMPONENTS.find((block) => block.id === blockId) as SourceCalcBlockType;
};
