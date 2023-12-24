export function replaceComma(value: string | number): number {
  if (typeof value === 'number') {
    return value;
  }

  const floatValue = parseFloat(value.replace(',', '.'));
  return Number.isNaN(floatValue) ? 0 : floatValue;
}
