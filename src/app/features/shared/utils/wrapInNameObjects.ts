export const wrapInNameObject = <T> (name: T) => ({ name })

export const wrapInNameObjects = <T> (values?: T[]) => values
  ? values.map(wrapInNameObject)
  : undefined
