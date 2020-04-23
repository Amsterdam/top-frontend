import React from "react"
import { Checkbox as AscCheckbox } from "@datapunt/asc-ui"
import { useField } from "react-final-form"
import { FieldValidator } from "final-form"


type Props = {
  name: string
  value: string
  validate?: FieldValidator<string>
}

const CheckboxField:React.FC<React.HTMLAttributes<HTMLInputElement> & Props> = ({ name, value, validate, ...restProps }) => {
  const { input, meta } = useField(name, {
    type: "checkbox",
    value,
    validate
  })

  return <AscCheckbox
    error={meta.modified && meta.error}
    {...input}
    {...restProps}
  />
}

export default CheckboxField
