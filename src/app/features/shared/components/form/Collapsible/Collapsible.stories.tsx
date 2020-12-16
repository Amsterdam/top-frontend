import React from "react"
import { DebugFormValues, ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"
import Scaffold, { Fields } from "../Scaffold"

export default {
  title: "Custom form components / Collapsible"
}

const fields: Fields = {

  collapsible: {
    type: "Collapsible",
    props: {
      label: "Maandag dag",
      isOpen: true,
      fields: {
        primary: {
          type: "SelectField",
          props: {
            label: "1. Zo veel mogelijk",
            name: "primary_stadium",
            options: { foo: "Foo", bar: "Bar" }
          }
        },
        secondary_stadia: {
          type: "CheckboxFields",
          props: {
            label: "2. Aanvullen met",
            name: "secondary_stadia",
            options: { foo: "Foo", bar: "Bar" }
          }
        },
        exclude_stadia: {
          type: "CheckboxFields",
          props: {
            label: "3. Uitsluiten",
            name: "exclude_stadia",
            options: { foo: "Foo", bar: "Bar" }
          }
        }
      }
    }
  }
}

const handleSubmit = () => {
}

export const Example = () => (
  <ScaffoldForm onSubmit={ handleSubmit }>
    <Scaffold fields={ fields } />
    <DebugFormValues />
  </ScaffoldForm>
)
