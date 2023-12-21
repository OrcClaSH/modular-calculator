export function removeLeadingZeros(value: string) {
  return value.replace(/^0+(?=\d)/, '');
}
