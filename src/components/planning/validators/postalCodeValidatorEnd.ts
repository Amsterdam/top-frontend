import {
  isAboveOtherField,
  isBelowOtherField
} from "amsterdam-react-final-form"

// @TODO: Typing parameters
const postalCodeValidatorEnd = (value: any, allValues: any, meta: any) => {
  const otherField = meta?.name.replace(/end$/, "start") ?? ""
  return isAboveOtherField(otherField, "De waarde moet hoger zijn dan \"Postcode van\"")(value, allValues)
}
export default postalCodeValidatorEnd
