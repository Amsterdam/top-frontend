import React from "react"
import { ComposedField } from "amsterdam-react-final-form"

import { useStartAddressModal } from "../../itineraries/add-start-address/hooks/useStartAddressModal"
import { useCaseModal } from "../../itineraries/add-start-address/hooks/useCaseModal"
import { useField } from "react-final-form"
import StartAddress from "../../itineraries/add-start-address/StartAddress"
import { Button } from "@datapunt/asc-ui"
import { Link } from "@reach/router"
import AddStartAddressModal from "../../itineraries/add-start-address/AddStartAddressModal"
import CaseModal from "../../itineraries/add-start-address/CadeModal"
import Box from "../../atoms/Box/Box"

export type AddressPickerProps = React.ComponentProps<typeof ComposedField> & {
  name: string
}

/**
 * Opens a modal in which you can select an address
 */
const AddressPicker: React.FC<AddressPickerProps> = ({ position, align, label, hint, name }) => {
  const { getUrl: getStartAddressUrl } = useStartAddressModal()
  const { getUrl: getCaseUrl } = useCaseModal()
  const { input: { value, onChange } } = useField<CaseId>(name, {})

  return (
    <ComposedField position={position} align={align} label={label} hint={hint}>
      { value
        ? (<>
          <StartAddress caseId={value} caseTo={getCaseUrl}/>
          <Box pt={2} pl={1}>
            <Button type='button' variant='textButton' onClick={() => onChange(undefined)}>
              Verwijder startadres
            </Button>
          </Box>
        </>)
        : (
          <Link to={getStartAddressUrl()}>
            <Button type='button' variant="textButton">
              Klik hier om een adres te kiezen
            </Button>
          </Link>
        )
      }
      <AddStartAddressModal onAddStartAddress={(caseId: any) => { onChange(caseId) }} />
      <CaseModal />
    </ComposedField>
  )
}

export default AddressPicker
