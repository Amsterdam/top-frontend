import {FieldState, FieldValidator} from "final-form"

export const combineValidators = (...validators: FieldValidator<any>[]) => (value:any, allValues:object, meta?:FieldState<any>) => {
  for(const validator of validators) {
    const result = validator(value, allValues, meta)
    if (result !== undefined) {
      return result
    }
  }
  return undefined
}
