import React from "react"
import { DebugFormValues, ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"
import Scaffold, { Fields } from "../Scaffold"

const metadata = {
  title: "Custom form components / ShowHide"
}

export default metadata

const fields: Fields = {
  dropDown: {
    type: "SelectField",
    props: {
      label: "Make a choice below and see form fields appearing",
      name: "dropDown",
      options: {
        "": "–",
        foo: "foo",
        bar: "bar"
      }
    }
  },
  fooRelated: {
    type: "ShowHide",
    props: {
      shouldShow: ({ values: { dropDown } }) => dropDown === "foo",
      field: { type: "TextField", props: { label: "This field is related to foo", name: "fooRelated" } }
    }
  },
  barRelated: {
    type: "ShowHide",
    props: {
      shouldShow: ({ values: { dropDown } }) => dropDown === "bar",
      field: {
        type: "RadioFields",
        props: { label: "This field is related to bar", name: "bar", options: { lorem: "lorem", ipsum: "ipsum" } }
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
