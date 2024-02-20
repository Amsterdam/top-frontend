import React, { useCallback } from "react"
import { TrashBin } from "@amsterdam/asc-assets"
import useNavigation from "app/features/shared/routing/useNavigation"
import StyledButton from "app/features/shared/components/atoms/StyledButton/StyledButton"
import { useVisit } from "app/state/rest"
import { useNoteWizard } from "../../organisms/NoteWizard/hooks/useNoteWizard"

type Props = {
  caseId: string
  itineraryId: string
  visitId: string
}

const DeleteVisitButton: React.FC<Props> = ({ visitId, itineraryId, caseId }) => {
  const { execDelete } = useVisit(visitId, { lazy: true })
  const { clearSteps } = useNoteWizard(caseId)
  const { navigateTo } = useNavigation()

  const handleClick = useCallback(async () => {
    if (window.confirm("Weet je zeker dat je dit bezoek wilt verwijderen?")) {
      await navigateTo("/lijst/:itineraryId", { itineraryId })
      clearSteps()
      return execDelete()
    }
  }, [ execDelete, itineraryId, clearSteps ])

  return <StyledButton variant="blank" onClick={ handleClick } icon={ <TrashBin /> } />
}

export default DeleteVisitButton
