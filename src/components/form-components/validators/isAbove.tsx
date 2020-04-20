/**
 * Very simple validation method. Given value should be between `low` and `high`.
 */
export const isAbove = (min:number|string) => (value:string|number):string|undefined  => {
  const parsedMin = typeof min === 'string'
    ? parseFloat(min)
    : min

  const parsedValue = typeof value === 'string'
    ? parseFloat(value)
    : value

  if (parsedValue < parsedMin) {
    return `De waarde moet hoger dan ${min} zijn`
  }

  return undefined
}
