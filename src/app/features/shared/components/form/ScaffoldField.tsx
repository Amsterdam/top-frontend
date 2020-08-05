import React from "react"
import { ScaffoldAvailableFields, ScaffoldField as AmsterdamScaffoldField } from "amsterdam-react-final-form"

import Collapsible, { CollapsibleProps } from "./Collapsible/Collapsible"
import UniqueDropdown , { UniqueDropdownProps } from "./UniqueDropdown/UniqueDropdown"
import ShowHide , { ShowHideProps } from "./ShowHide/ShowHide"
import AddressPicker, { AddressPickerProps } from "./AddressPicker/AddressPicker"
import CurrentTime , { CurrentTimeProps } from "./CurrentTime/CurrentTime"

export type Field =
  // NOTE: add your own custom types here:
  | { type: "AddressPicker", props: AddressPickerProps }
  | { type: "Collapsible", props: CollapsibleProps }
  | { type: "ShowHide", props: ShowHideProps }
  | { type: "UniqueDropdown", props: UniqueDropdownProps }
  | { type: "CurrentTime", props: CurrentTimeProps }
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
    case "ShowHide":
      return <ShowHide {...field.props} />
    case "UniqueDropdown":
      return <UniqueDropdown {...field.props} />
    case "CurrentTime":
      return <CurrentTime {...field.props} />
    default:
      return <AmsterdamScaffoldField field={field} />
  }
}

export default ScaffoldField
