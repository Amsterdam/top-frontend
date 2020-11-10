import React, { useCallback } from "react"
import { navigate } from "@reach/router"

import DefaultModal from "app/features/shared/components/organisms/Modal/DefaultModal"
import to from "app/features/shared/routing/to"

type Props = {
  itineraryId: string
}

const NoteWizardModal: React.FC<Props> = ({ children, itineraryId }) => {
  const handleClose = useCallback(() => navigate(to("/lijst/:itineraryId", { itineraryId })), [ itineraryId ])
  return (
    <DefaultModal title="Verwerken bezoek" onClose={ handleClose }>
      { children }
    </DefaultModal>
  )
}

export default NoteWizardModal
