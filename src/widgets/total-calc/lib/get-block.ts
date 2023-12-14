import { SourceCalcBlockType, blockComponents } from '@shared/config/constants';

export const getBlock = (blockId: number) => {
  return blockComponents.find((block) => block.id === blockId) as SourceCalcBlockType;
};
