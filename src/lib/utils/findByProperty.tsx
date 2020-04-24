export function findByProperty<T, K extends keyof T>(
  items: T[] | null | undefined,
  property: K,
  value: T[K] | null | undefined): T | undefined {
  if (items === null || items === undefined || value === null || value === undefined) {
    return undefined
  }

  return items.find(item => item[property] === value)
}
