import React from "react"
import {useField} from "react-final-form"
import {FieldValidator} from "final-form"
import {RadioGroup, Radio} from "@datapunt/asc-ui"
import styled from "styled-components"

type Options = {
  [key:string]: string
}

export type Props = {
  name: string
  options: Options
  horizontal?: boolean
  validate?: FieldValidator<string>
} & React.HTMLAttributes<HTMLInputElement>

// @TODO switch to ASC-label once they fix the 'Cannot update a component (`Label`) while rendering a different component (`ForwardRef`)' - error
const Label = styled.label`
  span {     
    padding-right: 16px;   // <- Inspected and copied from storybook: https://amsterdam.github.io/amsterdam-styled-components/?path=/docs/experimental-atoms-radio--error
  } 
`

const RadioFieldGroup:React.FC<Props> = ({name, horizontal, validate, options}) => (
    <RadioGroup name={name} horizontal={horizontal}>
      { Object
        .entries(options)
        .map(([value, label]) => (
          <Label key={value} htmlFor={value}>
            <RadioControl id={value} value={value} name={name} validate={validate} />
            <span>{ label }</span>
          </Label>
        )) }
    </RadioGroup>
)

type RadioControlProps = {
  id: string
  value: string,
  name: string,
  validate?: FieldValidator<string>
}

const RadioControl:React.FC<RadioControlProps> = ({ id, value, name, validate }) => {
  const { input } = useField(name, {
    type: 'radio',
    value,
    validate
  })

  return (<Radio {...input} id={id} />)
}

export default RadioFieldGroup
