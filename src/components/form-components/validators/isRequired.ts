/**
 * Very simple generic isRequired validation method.
 */
export function isRequired<T>(value:T|undefined):string|undefined {
  const message = "Dit veld is verplicht"

  if (Array.isArray(value) && value.length === 0) {
    return message
  }

  if (value === undefined) {
    return message
  }

  return undefined
}
