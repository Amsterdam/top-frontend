import React, {useCallback, useMemo} from "react"
import { navigate } from "@reach/router"
import {ScaffoldForm} from "amsterdam-react-final-form"

import {useLoggedInUser} from "app/state/rest/custom/useLoggedInUser"

import to from "app/features/shared/routing/to"
import CenteredSpinner from "app/features/shared/components/atoms/CenteredSpinner/CenteredSpinner"

import { useNoteWizard } from "./hooks/useNoteWizard"
import NoteWizardManager from "./components/NoteWizardManager"
import NoteWizardFormScaffoldFields from "./components/NoteWizardScaffoldFields"
import NodeWizardSubtitle from "./components/NoteWizardSubtitle"

import {useItinerary} from "app/state/rest/custom/useItinerary"
import {ItineraryItem} from "app/features/types"
import {mapPostValues} from "./utils/mapValues";
import {FormValues} from "./types";

type Props = {
  valuesFromApi?: FormValues
  onSubmit: (values:Components.Schemas.Visit) => Promise<any>
  caseId: string
  itineraryId: string
}

const NoteWizard: React.FC<Props> = ({ itineraryId, caseId, onSubmit, valuesFromApi }) => {
  const { data: itinerary } = useItinerary(itineraryId)
  const user = useLoggedInUser()

  const itineraryItem = useMemo(() => itinerary
    ?.items
    ?.find(_ => _.case.case_id === caseId),
    [ itinerary, caseId ]
  ) as ItineraryItem

  const { pushStep, popStep, getCurrentStep, clearSteps, setValues, getValues: getUnsubmittedValues } = useNoteWizard(caseId)
  const wizardStep = getCurrentStep() ?? "stepOne"

  const initialValues = useMemo(
    () => (getUnsubmittedValues() ?? valuesFromApi ?? { itinerary_item: itineraryItem?.id, author: user?.id  }),
    [ getUnsubmittedValues, valuesFromApi, user, itineraryItem ]
  )

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
        return onSubmit(mapPostValues(values))
          .then(() => {
            clearSteps()
            return navigate(to("/lijst/:itineraryId/", { itineraryId }))
          })
      }
    }

    return Promise.resolve(true)
  }, [pushStep, clearSteps, setValues, wizardStep, onSubmit, itineraryId])

  return (
    itineraryItem && user
      ? (
        <ScaffoldForm onSubmit={handleSubmit} initialValues={initialValues} keepDirtyOnReinitialize={true}>
          <NodeWizardSubtitle itineraryItem={itineraryItem} />
          <NoteWizardFormScaffoldFields step={wizardStep} onBackButtonClicked={handleBackButtonClick} />
          <NoteWizardManager caseID={ caseId } />
        </ScaffoldForm>
      )
     : <CenteredSpinner size={60} />
  )
}

export default NoteWizard
