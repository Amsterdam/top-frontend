import React from "react"
import { useField } from "react-final-form"

import _difference from "lodash/difference"
import _isEqual from "lodash/isEqual"

import ComplexSelectField, { Props as ComplexSelectFieldProps } from "amsterdam-react-final-form/components/final-form/SelectField/ComplexSelectField"

const alreadySelected = (values: any[]) => (value: any) => {
  for (const v of values) {
    if (_isEqual(v, value)) {
      return false
    }
  }
  return true
}

const fieldNamePattern = /\[\d+]$/

/**
 * When multiple UniqueDropdowns with the same name are defined: a value cannot be chosen twice.
 */
const UniqueDropdown: React.FC<ComplexSelectFieldProps<any>> = ({ options, ...restProps }) => {
  if (!restProps.name.match(fieldNamePattern)) {
    throw new Error("Given fieldname should be an item in an array. Eg. 'field[0]'.")
  }

  const { input: { value: allFieldValues } } = useField(restProps.name.replace(fieldNamePattern, ""))
  const { input: { value: ownValue } } = useField(restProps.name)

  const otherFieldValues = _difference(allFieldValues || [], [ownValue])
  const filteredOptions = options.filter(alreadySelected(otherFieldValues))

  return (<ComplexSelectField {...restProps} options={filteredOptions} />)
}

export default UniqueDropdown
