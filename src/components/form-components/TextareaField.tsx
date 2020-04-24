import React from "react"
import { useField } from "react-final-form"
import { FieldValidator } from "final-form"
import noop from "../../lib/utils/noop"
import Textarea from "./components/Textarea"

export type Props = {
  name: string
  validate?: FieldValidator<number>
} & React.TextareaHTMLAttributes<HTMLTextAreaElement>


const TextareaField: React.FC<Props> = ({ name, validate = noop, ...restProps }) => {
  const {
    meta,
    input
  } = useField(name, {
    type: "text",
    validate
  })

  return <Textarea
    error={meta.touched && meta.error}
    {...input}
    {...restProps}
  />
}

export default TextareaField
