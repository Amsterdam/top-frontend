import React from "react"
import { ScaffoldAvailableFields, ScaffoldField as AmsterdamScaffoldField } from "amsterdam-react-final-form"

import Collapsible, { CollapsibleProps } from "./Collapsible/Collapsible"
import UniqueDropdown , { UserDropdownProps } from "./UniqueDropdown/UniqueDropdown"

export type Field =
  // NOTE: add your own custom types here:
  | { type: "Collapsible", props: CollapsibleProps }
  | { type: "UserDropDown", props: UserDropdownProps }
  | ScaffoldAvailableFields

type ScaffoldFieldProps = {
  field: Field
}

const ScaffoldField: React.FC<ScaffoldFieldProps> = ({ field }) => {
  switch (field.type) {
    // NOTE: add your own custom components here:
    case "Collapsible":
      return <Collapsible {...field.props} />
    case "UserDropDown":
      return <UniqueDropdown {...field.props} />
    default:
      return <AmsterdamScaffoldField field={field} />
  }
}

export default ScaffoldField
