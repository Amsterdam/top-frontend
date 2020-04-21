import React from "react"
import { Input as AscInput } from "@datapunt/asc-ui"
import {useField} from "react-final-form"
import {FieldValidator} from "final-form"
import noop from "../../lib/utils/noop"
import styled from "styled-components"

export type Props = {
  name: string
  validate?: FieldValidator<number>
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>

// @TODO: Check why ASC Input does not allow forwardedAs
const StyledAscInput = styled(AscInput)``

const TextareaField:React.FC<Props> = ({name, validate = noop, ...restProps}) => {
  const {
    meta,
    input
  } = useField(name, {
    type: 'text',
    validate
  })

  // @ts-ignore
  return <StyledAscInput
    forwardedAs="textarea"
    error={meta.touched && meta.error}
    {...input}
    {...restProps}
  />
}

export default TextareaField
