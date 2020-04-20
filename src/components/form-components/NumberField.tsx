import React from "react"
import { Input as AscInput } from "@datapunt/asc-ui"
import {useField} from "react-final-form"
import {FieldValidator} from "final-form"

export type Props = {
  name: string
  validate?: FieldValidator<number>
} & React.InputHTMLAttributes<HTMLInputElement>

const NumberField:React.FC<Props> = ({name, validate, ...restProps}) => {
  const {
    meta,
    input
  } = useField(name, {
    type: 'number',
    validate
  })

  return <AscInput
    error={meta.touched && meta.error}
    {...input}
    {...restProps}
  />
}

export default NumberField
