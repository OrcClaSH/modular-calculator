export function replaceZero(value: string) {
  return value.replace(/^0+(?=\d)/, '');
}
