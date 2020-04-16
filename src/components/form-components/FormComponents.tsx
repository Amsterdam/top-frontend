import React from "react"
import {Field} from "react-final-form"

type NativeElementProps = |
  Partial<HTMLInputElement> |
  Partial<HTMLTextAreaElement> |
  Partial<HTMLSelectElement>

interface Props {
  name: string
  type?: string
  component: React.ComponentType<any>
}

export const FormField:React.FC<Props & NativeElementProps> = ({name, type, component: Component, ...restProps}) => (
  <Field name={name} type={type}>
    { props => (<Component {...props.input} type={type} {...restProps} />) }
  </Field>
)
