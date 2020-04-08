export function filterNullish <T>(items:Array<T | null | undefined>):Array<T> {
  return items.filter((item):item is T => item !== null && item !== undefined)
}
