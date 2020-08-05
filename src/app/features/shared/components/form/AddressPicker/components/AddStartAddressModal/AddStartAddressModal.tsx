import React, { useCallback, useContext } from "react"
import styled from "styled-components"

import DefaultModal from "app/features/shared/components/organisms/Modal/DefaultModal"

import SearchForm from "app/features/shared/components/organisms/SearchForm/SearchForm

import { useStartAddressModal } from "../../hooks/useStartAddressModal"
import StartAddressSearchResults from "../StartAddressSearchResults/StartAddressSearchResults"
import { SearchFormContext } from "../../../../organisms/SearchForm/SearchFormProvider"

const Div = styled.div`
  padding-bottom: 15px;
`

type Props = {
  itineraryId: string
  onAddStartAddress: (caseId: string) => void
}

const AddStartAddressModal: React.FC<Props> = ({ onAddStartAddress, itineraryId }) => {
  const { values } = useContext(SearchFormContext)
  const { shouldShow, handleClose } = useStartAddressModal()

  const handleAddAddress = useCallback((caseId: string) => {
    onAddStartAddress(caseId)
    return handleClose()
  }, [ handleClose, onAddStartAddress ])

  if (!shouldShow) {
    return null
  }

  return (
    <DefaultModal title='Startadres' onClose={handleClose}>
      <Div>
        <b>Bij welk adres wil je beginnen?</b>
      </Div>
      <Div>
        <SearchForm />
        { values && <StartAddressSearchResults itineraryId={itineraryId} handleAddButtonClick={handleAddAddress} {...values} /> }
      </Div>
    </DefaultModal>
  )
}

export default AddStartAddressModal
