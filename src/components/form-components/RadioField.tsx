import React from "react"
import {useField} from "react-final-form"
import {FieldValidator} from "final-form"
import styled from "styled-components"

export type Props = {
  name: string
  value: string
  validate?: FieldValidator<string>
} & React.HTMLAttributes<HTMLInputElement>

const RadioButton = styled.input`
  margin-right: 8px;
`

const RadioField:React.FC<Props> = ({name, validate, value, ...restProps}) => {
  const { input } = useField(name, {
    type: 'radio',
    value,
    validate
  })

  return <RadioButton
    {...input}
    {...restProps}
  />
}

export default RadioField
