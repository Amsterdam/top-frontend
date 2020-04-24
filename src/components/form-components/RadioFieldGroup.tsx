import React from "react"
import { useField } from "react-final-form"
import { FieldValidator } from "final-form"
import { RadioGroup, Radio, Label } from "@datapunt/asc-ui"

type Options = {
  [key: string]: string
}

export type Props = {
  name: string
  options: Options
  horizontal?: boolean
  validate?: FieldValidator<string>
} & React.HTMLAttributes<HTMLInputElement>

const RadioFieldGroup: React.FC<Props> = ({ name, horizontal, validate, options }) => (
    <RadioGroup name={name} horizontal={horizontal}>
      { Object
        .entries(options)
        .map(([value, label]) => (
          <Label key={value} htmlFor={value} label={label}>
            <RadioControl id={value} value={value} name={name} validate={validate} />
          </Label>
        )) }
    </RadioGroup>
)

type RadioControlProps = {
  id: string
  value: string
  name: string
  validate?: FieldValidator<string>
}

const RadioControl: React.FC<RadioControlProps> = ({ id, value, name, validate }) => {
  const { input } = useField(name, {
    type: "radio",
    value,
    validate
  })

  return (<Radio {...input} id={id} />)
}

export default RadioFieldGroup
