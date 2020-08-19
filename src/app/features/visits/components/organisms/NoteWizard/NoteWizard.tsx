import React, { useCallback } from "react"
import { ScaffoldForm } from "amsterdam-react-final-form"
import { useParams, navigate } from "@reach/router"
import to from "app/features/shared/routing/to"

import { useNoteWizard } from "./hooks/useNoteWizard"
import NoteWizardManager from "./components/NoteWizardManager"
import NoteWizardFormScaffoldFields from "./components/NoteWizardScaffoldFields"
import NodeWizardSubtitle from "./components/NoteWizardSubtitle"
import { ItineraryItem } from "app/features/types"
import { useLoggedInUser } from "app/state/rest/custom/useLoggedInUser"
import { useItinerary } from "app/state/rest/custom/useItinerary"
import useOptionalVisit from "app/state/rest/custom/useOptionalVisit"
import { mapPostValues, mapInitialValues } from "./utils/mapValues"

const NoteWizard: React.FC = () => {

  const { caseId, itineraryId, id } = useParams()
  const { data: itinerary } = useItinerary(itineraryId)
  const { pushStep, popStep, getCurrentStep, clearSteps, getValues, setValues } = useNoteWizard(caseId)
  const user = useLoggedInUser()
  const visit = useOptionalVisit(id)
  const { data, execPost, execPut } = visit
  const isUpdate = data !== undefined

  const itineraryItem = itinerary?.items.find(item => item.case.case_id === caseId) as unknown as ItineraryItem

  const getInitialValues = useCallback(() => {
    if (isUpdate) return mapInitialValues(user?.id !== undefined ? { ...data, author: user?.id } : data)
    return getValues() ?? { itinerary_item: itineraryItem?.id, author: user?.id }
  }, [getValues, data, itineraryItem, user, isUpdate])

  const wizardStep = getCurrentStep() ?? "stepOne"
  const initialValues = getInitialValues()

  const handleBackButtonClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    popStep()
  }, [ popStep ])

  const handleSubmit = useCallback((values) => {
    setValues(values)

    switch(wizardStep) {
      case "stepOne":
        pushStep(
          values.situation === "access_granted"
            ? "accessGranted"
            : "notableThings"
        )
        break
      case "notableThings":
        pushStep("suggestion")
        break
      case "suggestion":
        pushStep("nextVisit")
        break
      case "nextVisit":
      case "accessGranted": {
        const method = isUpdate ? execPut : execPost
        const onSuccess = () => {
          clearSteps()
          navigate(to("/lijst/:itineraryId/", { itineraryId }))
        }
        method(mapPostValues(values), { onSuccess })
        break
      }
    }

    return Promise.resolve(true)
  }, [pushStep, clearSteps, setValues, wizardStep, itineraryId, isUpdate, execPut, execPost])

  return (
    <ScaffoldForm onSubmit={handleSubmit} initialValues={initialValues} keepDirtyOnReinitialize={true}>
      <NodeWizardSubtitle itineraryItem={itineraryItem} />
      <NoteWizardFormScaffoldFields step={wizardStep} onBackButtonClicked={handleBackButtonClick} />
      <NoteWizardManager caseID={ caseId } />
    </ScaffoldForm>
  )
}

export default NoteWizard
