import React from "react"
import { Select as AscSelect } from "@datapunt/asc-ui"
import {useField} from "react-final-form"
import {FieldValidator} from "final-form"

export type Props = {
  name: string
  validate?: FieldValidator<string>,
  options: Record<string, string>
} & React.HTMLAttributes<HTMLSelectElement>

const SelectField:React.FC<Props> = ({name, validate, options, ...restProps}) => {
  const { input, meta } = useField(name, {
    type: 'select',
    validate
  })

  return <AscSelect {...input} {...restProps} error={meta.touched && meta.error}>
    { Object
      .entries(options)
      .map(([key, label]) => (<option key={key} value={key}>{label}</option>))
    }
  </AscSelect>
}

export default SelectField
