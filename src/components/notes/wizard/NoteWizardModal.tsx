import React, { useCallback } from "react"
import DefaultModal from "../../global/Modal/DefaultModal"
import navigateTo from "../../../lib/navigateTo"
import NoteWizard from "./NoteWizard"

const NoteWizardModal: React.FC = () => {
  const handleClose = useCallback(() => navigateTo("/"), [])
  return (
    <DefaultModal title="Verwerken bezoek" onClose={handleClose}>
      <NoteWizard />
    </DefaultModal>
  )
}

export default NoteWizardModal
