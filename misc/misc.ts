export function sumValues(values: number[]): number {
  const subset = values.slice(0, -1);
  const sum = subset.reduce((acc, val) => acc + val, 0);
  return sum;
}

export function getTextContent(
  elements: ElementArrayFinder
): Promise<string[]> {
  const values: string[] = [];

  for (let i = 0; i < elements.length; i++) {
    const value = await elements[i].textContent();
    if (value !== null) {
      values.push(value);
    }
  }

  return values;
}
