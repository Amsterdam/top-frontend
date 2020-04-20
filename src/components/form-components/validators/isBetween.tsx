/**
 * Very simple validation method. Given value should be between `low` and `high`.
 */
export const isBetween = (low:number, high:number) => (value:string|number):string|undefined  => {
  const parsedValue = typeof value === 'string'
    ? parseFloat(value)
    : value

  if (parsedValue < low || parsedValue > high) {
    return `De waarde moet tussen ${low} en ${high} liggen`
  }

  return undefined
}
