import React, { useCallback } from "react"
import DefaultModal from "app/features/shared/components/organisms/Modal/DefaultModal"
import useNavigation from "app/features/shared/routing/useNavigation"

type Props = {
  itineraryId: string
}

const NoteWizardModal: React.FC<Props> = ({ children, itineraryId }) => {
  const { navigateTo } = useNavigation()

  const handleClose = useCallback(() => navigateTo("/lijst/:itineraryId", { itineraryId }), [itineraryId, navigateTo])

  return (
    <DefaultModal title="Verwerken bezoek" onClose={ handleClose }>
      { children }
    </DefaultModal>
  )
}

export default NoteWizardModal
