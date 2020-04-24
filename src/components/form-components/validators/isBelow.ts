/**
 * Very simple validation method. Given value should be below `max`.
 */
export const isBelow = (max: number|string) => (value: string|number): string|undefined => {
  const parsedMax = typeof max === "string"
    ? parseFloat(max)
    : max

  const parsedValue = typeof value === "string"
    ? parseFloat(value)
    : value

  if (parsedValue > parsedMax) {
    return `De waarde moet lager dan ${ max } zijn`
  }

  return undefined
}
