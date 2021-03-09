import React from "react"
import { useParams } from "@reach/router"

import { useVisits } from "app/state/rest"

import NoteWizardModal from "../../organisms/NoteWizard/NoteWizardModal"
import NoteWizard from "../../organisms/NoteWizard/NoteWizard"

const CreateVisitPage: React.FC = () => {
  const { itineraryId, caseId } = useParams()
  const { execPost } = useVisits({ lazy: true })

  return (<NoteWizardModal itineraryId={ itineraryId }>
    <NoteWizard
      onSubmit={ execPost }
      itineraryId={ itineraryId }
      caseId={ caseId }
    />
  </NoteWizardModal>)
}

export default CreateVisitPage
