export function sumValues(values: number[]): number {
  const subset = values.slice(0, -1);
  const sum = subset.reduce((acc, val) => acc + val, 0);
  return sum;
}
