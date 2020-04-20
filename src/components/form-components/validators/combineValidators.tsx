export const combineValidators = (...validators: Array<(value:any) => undefined|string>) => (value:any) => {
  for(const validator of validators) {
    const result = validator(value)
    if (result !== undefined) {
      return result
    }
  }
  return undefined
}
