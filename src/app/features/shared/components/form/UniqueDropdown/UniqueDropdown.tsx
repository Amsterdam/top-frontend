import React from "react"

import ComplexSelectField, { Props as ComplexSelectFieldProps } from "@amsterdam/amsterdam-react-final-form/components/final-form/SelectField/ComplexSelectField"

export type UniqueDropdownProps = ComplexSelectFieldProps<any>

const fieldNamePattern = /\[\d+]$/

/**
 * a value cannot be chosen twice, when multiple UniqueDropdowns with the same name are defined
 */
const UniqueDropdown: React.FC<UniqueDropdownProps> = ({ options, ...restProps }) => {
  if (!restProps.name.match(fieldNamePattern)) {
    throw new Error("Given fieldname should be an item in an array. Eg. 'field[0]'.")
  }
  return (<ComplexSelectField { ...restProps } options={ options } />)
}

export default UniqueDropdown
