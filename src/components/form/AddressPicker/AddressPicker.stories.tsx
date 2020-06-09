import React from "react"
import { DebugFormValues, ScaffoldForm } from "amsterdam-react-final-form"
import Scaffold, { Fields } from "../Scaffold"

export default {
  title: "Custom form components / AddressPicker"
}

const fields: Fields = {
  foo: {
    type: "TextField",
    props: {
      label: "Foo",
      name: "foo"
    }
  },
  addressPicker: {
    type: "AddressPicker",
    props: {
      label: "Start adres",
      name: "address"
    }
  },
  bar: {
    type: "TextField",
    props: {
      label: "Bar",
      name: "bar"
    }
  },
  submit: {
    type: "SubmitButton",
    props: {
      label: "Opslaan"
    }
  }
}

const handleSubmit = () => {}

export const Example = () => (
  <ScaffoldForm onSubmit={handleSubmit}>
    <Scaffold fields={fields} />
    <DebugFormValues />
  </ScaffoldForm>
)
