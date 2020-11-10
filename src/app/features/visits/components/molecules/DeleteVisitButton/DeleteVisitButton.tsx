import React, { useCallback } from "react"
import { navigate } from "@reach/router"
import { TrashBin } from "@amsterdam/asc-assets"

import StyledButton from "app/features/shared/components/atoms/StyledButton/StyledButton"
import { useVisit } from "app/state/rest"

import to from "app/features/shared/routing/to"
import { useNoteWizard } from "../../organisms/NoteWizard/hooks/useNoteWizard"

type Props = {
  caseId: string
  itineraryId: string
  visitId: string
}

const DeleteVisitButton: React.FC<Props> = ({ visitId, itineraryId, caseId }) => {
  const { execDelete } = useVisit(visitId, { lazy: true })
  const { clearSteps } = useNoteWizard(caseId)

  const handleClick = useCallback(async () => {
    if (window.confirm("Weet je zeker dat je dit bezoek wilt verwijderen?")) {
      await navigate(to("/lijst/:itineraryId", { itineraryId }))
      clearSteps()
      return execDelete()
    }
  }, [ execDelete, itineraryId, clearSteps ])

  return <StyledButton variant="blank" onClick={ handleClick } icon={ <TrashBin /> } />
}

export default DeleteVisitButton
