import React from "react"
import { ScaffoldAvailableFields, ScaffoldField as AmsterdamScaffoldField } from "amsterdam-react-final-form"

import Collapsible, { CollapsibleProps } from "./Collapsible/Collapsible"
import UniqueDropdown , { UniqueDropdownProps } from "./UniqueDropdown/UniqueDropdown"
import AddressPicker, { AddressPickerProps } from "./AddressPicker/AddressPicker"

export type Field =
  // NOTE: add your own custom types here:
  | { type: "Collapsible", props: CollapsibleProps }
  | { type: "UniqueDropdown", props: UniqueDropdownProps }
  | { type: "AddressPicker", props: AddressPickerProps }
  | ScaffoldAvailableFields

type ScaffoldFieldProps = {
  field: Field
}

const ScaffoldField: React.FC<ScaffoldFieldProps> = ({ field }) => {
  switch (field.type) {
    // NOTE: add your own custom components here:
    case "AddressPicker":
      return <AddressPicker {...field.props} />
    case "Collapsible":
      return <Collapsible {...field.props} />
    case "UniqueDropdown":
      return <UniqueDropdown {...field.props} />
    default:
      return <AmsterdamScaffoldField field={field} />
  }
}

export default ScaffoldField
