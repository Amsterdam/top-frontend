import React from "react"
import {Field} from "react-final-form"

type NativeElementProps = |
  Partial<HTMLInputElement> |
  Partial<HTMLTextAreaElement> |
  Partial<HTMLSelectElement>

interface Props {
  name: string
  component: React.ComponentType<any>
}

export const FormField:React.FC<Props & NativeElementProps> = ({name, component: Component, ...restProps}) => (
  <Field name={name}>
    { props => (<Component {...props.input} {...restProps} />) }
  </Field>
)
