import React, { useCallback } from "react"
import { navigate } from "@reach/router"

import DefaultModal from "app/features/shared/components/organisms/Modal/DefaultModal"
import to from "app/features/shared/routing/to"

import NoteWizard from "./NoteWizard"

const NoteWizardModal: React.FC = () => {
  const handleClose = useCallback(() => navigate(to("/")), [])
  return (
    <DefaultModal title="Verwerken bezoek" onClose={handleClose}>
      <NoteWizard />
    </DefaultModal>
  )
}

export default NoteWizardModal
