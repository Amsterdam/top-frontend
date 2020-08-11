import React, { useCallback } from "react"
import { ScaffoldForm } from "amsterdam-react-final-form"
import { useParams } from "@reach/router"

import { useNoteWizard } from "./hooks/useNoteWizard"
import NoteWizardManager from "./components/NoteWizardManager"
import NoteWizardFormScaffoldFields from "./components/NoteWizardScaffoldFields"
import NodeWizardSubtitle from "./components/NoteWizardSubtitle"
import {useLoggedInUser} from "app/state/rest/custom/useLoggedInUser";
import {useItinerary} from "app/state/rest/custom/useItinerary";
import {ItineraryItem} from "app/features/types"

const NoteWizard: React.FC = () => {
  // @TODO Once we are ready to post, uncomment the following line:
  // const { execPost } = useVisits({lazy: true})

  const { caseId, itineraryId } = useParams()
  const { data: itinerary } = useItinerary(itineraryId)
  const { pushStep, popStep, getCurrentStep, getValues, setValues } = useNoteWizard(caseId)
  const user = useLoggedInUser()

  const itineraryItem = itinerary?.items.find(item => item.case.case_id === caseId) as unknown as ItineraryItem

  const wizardStep = getCurrentStep() ?? "stepOne"
  const initialValues = getValues() ?? { itinerary_item: itineraryItem?.id, author: user?.id  }

  const handleBackButtonClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    popStep()
  }, [ popStep ])

  const handleSubmit = useCallback((values) => {
    setValues(values)

    switch(wizardStep) {
      case "stepOne":
        pushStep(
          values.situation === "accessGranted"
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
      case "accessGranted":

        // @TODO we still need to post here!
        // return execPost(values)

        alert("DONE")
      break
    }

    return Promise.resolve(true)
  }, [pushStep, setValues, wizardStep])

  return (
    <ScaffoldForm onSubmit={handleSubmit} initialValues={initialValues} keepDirtyOnReinitialize={true}>
      <NodeWizardSubtitle itineraryItem={itineraryItem} />
      <NoteWizardFormScaffoldFields step={wizardStep} onBackButtonClicked={handleBackButtonClick} />
      <NoteWizardManager caseID={ caseId } />
    </ScaffoldForm>
  )
}

export default NoteWizard
