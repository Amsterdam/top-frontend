import React from "react"
import { Input as AscInput } from "@datapunt/asc-ui"
import {useField} from "react-final-form"
import {FieldValidator} from "final-form"
import noop from "../../lib/utils/noop"

export type Props = {
  name: string
  validate?: FieldValidator<number>
} & React.InputHTMLAttributes<HTMLInputElement>

const TextField:React.FC<Props> = ({name, validate = noop, ...restProps}) => {
  const {
    meta,
    input
  } = useField(name, {
    type: 'text',
    validate
  })

  return <AscInput
    error={meta.touched && meta.error}
    {...input}
    {...restProps}
  />
}

export default TextField
