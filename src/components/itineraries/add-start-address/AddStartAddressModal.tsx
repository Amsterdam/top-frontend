import React from "react"
import styled from "styled-components"

import DefaultModal from "../../global/Modal/DefaultModal"
import Search from "../../search/Search"
import createActionButtons, { OnAddStartAddress } from "./ActionButtons"
import { useStartAddressModal } from "./hooks/useStartAddressModal"
import { useCaseModal } from "./hooks/useCaseModal"

const Div = styled.div`
  padding-bottom: 15px;
`

type Props = {
  onAddStartAddress: OnAddStartAddress
}

const AddStartAddressModal: React.FC<Props> = ({ onAddStartAddress }) => {
  const { getUrl: getCaseUrl } = useCaseModal()
  const { shouldShow, handleClose } = useStartAddressModal()

  if (!shouldShow) {
    return null
  }

  const handleAddAddress = (caseId: CaseId) => {
    onAddStartAddress(caseId)
    return handleClose()
  }

  return (
    <DefaultModal title='Startadres' onClose={handleClose}>
      <Div>
        <b>Bij welk adres wil je beginnen?</b>
      </Div>
      <Div>
        <Search
          actionButtonsComponent={createActionButtons(handleAddAddress)}
          caseTo={getCaseUrl}
        />
      </Div>
    </DefaultModal>
  )
}

export default AddStartAddressModal
