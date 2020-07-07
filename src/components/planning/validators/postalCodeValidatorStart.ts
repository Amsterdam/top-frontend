import {
  isAboveOtherField,
  isBelowOtherField
} from "amsterdam-react-final-form"

// @TODO: Typing parameters
const postalCodeValidatorStart = (value: any, allValues: any, meta: any) => {
  const otherField = meta.name.replace(/start$/, "end")
  return isBelowOtherField(otherField, "De waarde moet lager zijn dan \"Postcode tot\"")(value, allValues)
}
export default postalCodeValidatorStart
