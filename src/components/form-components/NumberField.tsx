import React from "react"
import { Input as AscInput } from "@datapunt/asc-ui"
import {useField} from "react-final-form"
import {FieldValidator} from "final-form"
import noop from "../../lib/utils/noop"
import {combineValidators} from "./validators/combineValidators"
import {isAbove} from "./validators/isAbove"
import {isBelow} from "./validators/isBelow"

export type Props = {
  name: string
  validate?: FieldValidator<number>
} & React.InputHTMLAttributes<HTMLInputElement>

const NumberField:React.FC<Props> = ({name, validate = noop, ...restProps}) => {
  if (restProps.min !== undefined) {
    validate = combineValidators(isAbove(restProps.min), validate)
  }
  if (restProps.max !== undefined) {
    validate = combineValidators(isBelow(restProps.max), validate)
  }

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
