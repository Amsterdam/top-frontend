import React from "react"
import produce from "immer"

import ScaffoldField, { Field } from "../ScaffoldField"
import { useForm, useFormState } from "react-final-form"
import { FormState } from "final-form"
import { Dimensions, Responsive } from "@amsterdam/amsterdam-react-final-form"

export type ShowHideProps = {
  position?: Responsive<Dimensions>
  shouldShow: (formValues: FormState<any>) => boolean
  field: Field
  label?: string
  name?: string
}

const ShowHide: React.FC<ShowHideProps> = ({ shouldShow, field, position, name }) => {
  const form = useForm()
  const formState = useFormState()
  const fieldName = name ?? field.props.name

  const positionedField = produce(field, draft => {
    draft.props.position = position
  })

  const isShown = shouldShow(formState) ?? false

  if (!isShown && fieldName !== undefined) {
    form.change(fieldName, undefined)
  }

  return isShown
    ? <ScaffoldField field={ positionedField } />
    : null
}

export default ShowHide
