import { isAboveOtherField, isBelowOtherField } from "@amsterdam/amsterdam-react-final-form"
import { getIn } from "final-form"
import type { FieldState, FieldValidator } from "final-form"

type Value = number | null | undefined

const options = {
  start: {
    replace: "end",
    message: "De waarde moet lager zijn dan \"Postcode tot\"",
    validator: isBelowOtherField
  },
  end: {
    replace: "start",
    message: "De waarde moet hoger zijn dan \"Postcode van\"",
    validator: isAboveOtherField
  }
}

const overlaps = (a1: number[], a2: number[]) => a1.filter((n: number) => !a2.includes(n))
const rangeToArray = (start: number, end: number) => [...Array(end - start + 1)].map((_: number, idx) => start + idx)

const postalCodeSiblingValidator = (name: keyof typeof options, allowedPostalCodes: number[]): FieldValidator<Value> => (value: Value, allValues: object, meta?: FieldState<Value>) => {
  if (meta === undefined) return
  const { replace, message, validator } = options[name]
  const otherField = meta.name.replace(new RegExp(`${ name }$`), replace)
  const otherFieldValue = getIn(allValues, otherField) as number
  const start = value as number < otherFieldValue ? value as number : otherFieldValue
  const end = value as number < otherFieldValue ? otherFieldValue : value as number
  let newMessage = validator(otherField, message)(value, allValues) 
  if (start && end && !newMessage){
    const notOverlapingPostalCodes = overlaps(rangeToArray(start, end), allowedPostalCodes)
    if (!!notOverlapingPostalCodes.length){
      newMessage = "Deze reeks bevat postcodes die niet worden ondersteund"
    }
  }
  return newMessage
}

export default postalCodeSiblingValidator
