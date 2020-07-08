import {
  isAboveOtherField,
  isBelowOtherField
} from "amsterdam-react-final-form"

import type { FieldValidator, FieldState } from "final-form"
type Value = number | null | undefined

const options = {
  start: {
    replace: "end",
    message: "De waarde moet lager zijn dan \"Postcode tot\"",
    validator: isAboveOtherField
  },
  end: {
    replace: "start",
    message: "De waarde moet hoger zijn dan \"Postcode van\"",
    validator: isBelowOtherField
  }
}

const postalCodeSiblingValidator = (name: keyof typeof options): FieldValidator<Value> => (value: Value, allValues: object, meta?: FieldState<Value>) => {
  if (meta === undefined) return
  const { replace, message, validator } = options[name]
  const otherField = meta.name.replace(new RegExp(`${ name }$`), replace)
  return validator(otherField, message)(value, allValues)
}
export default postalCodeSiblingValidator
