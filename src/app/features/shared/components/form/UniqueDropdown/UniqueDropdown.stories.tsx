import React from "react"
import { DebugFormValues, ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"
import Scaffold, { Fields } from "../Scaffold"

const metadata = {
  title: "Forms / UniqueDropDown"
}

export default metadata

const fields: Fields = {
  field1: {
    type: "UniqueDropdown",
    props: {
      label: "field 0",
      name: "field[0]",
      optionLabelField: "label",
      options: [ { label: "" }, { label: "Object 1" }, { label: "Object 2" }, { label: "Object 3" }, { label: "Object 4" } ]
    }
  },
  field2: {
    type: "UniqueDropdown",
    props: {
      label: "field 1",
      name: "field[1]",
      optionLabelField: "label",
      options: [ { label: "" }, { label: "Object 1" }, { label: "Object 2" }, { label: "Object 3" }, { label: "Object 4" } ]
    }
  },
  field3: {
    type: "UniqueDropdown",
    props: {
      label: "field 2",
      name: "field[2]",
      optionLabelField: "label",
      options: [ { label: "" }, { label: "Object 1" }, { label: "Object 2" }, { label: "Object 3" }, { label: "Object 4" } ]
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
