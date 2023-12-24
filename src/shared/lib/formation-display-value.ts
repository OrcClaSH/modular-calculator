export function formationDisplayValue(value: string | number): string {
  if (typeof value === 'number') {
    return value.toString();
  }

  return value.replace(/^0+(?=\d)/, '');
}
