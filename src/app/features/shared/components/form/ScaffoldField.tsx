import React from "react"
import { ScaffoldAvailableFields, ScaffoldField as AmsterdamScaffoldField } from "@amsterdam/amsterdam-react-final-form"

import AddressPicker, { AddressPickerProps } from "./AddressPicker/AddressPicker"
import Collapsible, { CollapsibleProps } from "./Collapsible/Collapsible"
import CurrentTime, { CurrentTimeProps } from "./CurrentTime/CurrentTime"
import Divider, { DividerProps } from "app/features/shared/components/form/Divider/Divider"
import ShowHide, { ShowHideProps } from "./ShowHide/ShowHide"
import UniqueDropdown, { UniqueDropdownProps } from "./UniqueDropdown/UniqueDropdown"

export type Field =
// NOTE: add your own custom types here:
  | { type: "AddressPicker", props: AddressPickerProps }
  | { type: "Collapsible", props: CollapsibleProps }
  | { type: "CurrentTime", props: CurrentTimeProps }
  | { type: "Divider", props: DividerProps }
  | { type: "ShowHide", props: ShowHideProps }
  | { type: "UniqueDropdown", props: UniqueDropdownProps }
  | ScaffoldAvailableFields

type ScaffoldFieldProps = {
  field: Field
}

const ScaffoldField: React.FC<ScaffoldFieldProps> = ({ field }) => {
  switch (field.type) {
    // NOTE: add your own custom components here:
    case "AddressPicker":
      return <AddressPicker { ...field.props } />
    case "Collapsible":
      return <Collapsible { ...field.props } />
    case "CurrentTime":
      return <CurrentTime { ...field.props } />
    case "Divider":
      return <Divider { ...field.props } />
    case "ShowHide":
      return <ShowHide { ...field.props } />
    case "UniqueDropdown":
      return <UniqueDropdown { ...field.props } />
    default:
      return <AmsterdamScaffoldField field={ field } />
  }
}

export default ScaffoldField
