import React from "react"
import { ComposedField } from "@amsterdam/amsterdam-react-final-form"
import { Button } from "@amsterdam/asc-ui"
import { Link } from "react-router-dom"
import { useField } from "react-final-form"
import { useStartAddressModal } from "./hooks/useStartAddressModal"
import StartAddress from "./components/StartAddress/StartAddress"
import AddStartAddressModal from "./components/AddStartAddressModal/AddStartAddressModal"
import CaseModal from "./components/CaseModal/CaseModal"

export type AddressPickerProps = React.ComponentProps<typeof ComposedField> & {
  name: string
}

/**
 * Opens a modal in which you can select an address
 */
const AddressPicker: React.FC<AddressPickerProps> = ({ position, align, label, hint, name }) => {
  const { getUrl: getStartAddressUrl } = useStartAddressModal()
  const { input: { value, onChange } } = useField<string>(name, {})

  return (
    <ComposedField position={ position } align={ align } label={ label } hint={ hint }>
      { value
        ? (<>
          <StartAddress caseId={ value } />
          <div style={{ padding: "12px 8px" }}>
            <Button type="button" variant="textButton" onClick={ () => onChange(undefined) }>
              Verwijder startadres
            </Button>
          </div>
        </>)
        : (
          <Link to={ getStartAddressUrl() }>
            <Button type="button" variant="textButton">
              Kies een startadres
            </Button>
          </Link>
        )
      }
      <AddStartAddressModal onAddStartAddress={ (caseId: any) => { onChange(caseId) } } />
      <CaseModal />
    </ComposedField>
  )
}

export default AddressPicker
