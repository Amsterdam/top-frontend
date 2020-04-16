import React, {
  ChangeEventHandler,
  InputHTMLAttributes,
  TextareaHTMLAttributes,
  SelectHTMLAttributes
} from "react"

import {Field} from "react-final-form"

type NativeElementProps =
  | InputHTMLAttributes<HTMLInputElement>
  | TextareaHTMLAttributes<HTMLTextAreaElement>
  | SelectHTMLAttributes<HTMLSelectElement>

type ChangeHandler =
 | ChangeEventHandler<HTMLInputElement>
 | ChangeEventHandler<HTMLTextAreaElement>
 | ChangeEventHandler<HTMLSelectElement>

type ComponentProps = {
  onChange?: ChangeHandler
  type?: string
}

type Props = {
  name: string
  type?: string
  component: React.ComponentType<any> | 'input' | 'textarea' | 'select'
}


/**
 * @deprecated in favor of <Checkbox /> <Select /> <TextInput /> etc.
 *
 * Automatically bind react-final-form `fieldRenderProps` to a third-party input component.
 * @see https://final-form.org/docs/react-final-form/types/FieldRenderProps
 *
 * Example usage:
 *
 * # Basic elements:
 *
 * <FormField component='input' name='foo' />
 * <FormField component='textarea' name='bar' />
 * <FormField component='select' name='zoo'>
 *  <option value='foo'>Foo</option>
 *  <option value='foo'>Bar</option>
 *  <option value='zoo'>Zoo</option>
 * </FormField>
 *
 * # Third party elements:
 *
 * <FormField component={StyledInput} name='foo' />
 * <FormField component={StyledTextArea} cols={10} name='foo' />
 */
export const FormField:React.FC<NativeElementProps & Props> = ({ component: Component, children, ...props }) =>
  (typeof Component === 'string')
    ? (<Field component={Component} {...props}>{children}</Field>)
    : (<Field name={props.name} type={props.type}>
        { fieldRenderProps => (<Component {...fieldRenderProps.input} {...props}>{children}</Component>) }
      </Field>)
