export const arrayToObject = (array: Array<string|number>) => array.reduce(
  (acc, val) => ({ ...acc, [val]: val }), {}
)
