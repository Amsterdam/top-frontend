import React, { useCallback } from "react"
import { navigate } from "@reach/router"
import { themeSpacing, themeColor } from "@amsterdam/asc-ui"
import { ScaffoldForm } from "amsterdam-react-final-form"
import styled from "styled-components"

import { ItineraryItem } from "app/features/types"

import { useLoggedInUser } from "app/state/rest/custom/useLoggedInUser"
import { useItinerary } from "app/state/rest/custom/useItinerary"

import to from "app/features/shared/routing/to"
import CenteredSpinner from "app/features/shared/components/atoms/CenteredSpinner/CenteredSpinner"
import Spacing from "app/features/shared/components/atoms/Spacing/Spacing"

import { useNoteWizard } from "./hooks/useNoteWizard"
import NoteWizardManager from "./components/NoteWizardManager"
import NoteWizardFormScaffoldFields from "./components/NoteWizardFormScaffoldFields"
import NodeWizardSubtitle from "./components/NoteWizardSubtitle"

import DeleteVisitButton from "app/features/visits/components/molecules/DeleteVisitButton/DeleteVisitButton"

import { mapPostValues } from "./utils/mapValues"
import { FormValues } from "./types"

type Props = {
  valuesFromApi?: FormValues
  onSubmit: (values: Components.Schemas.Visit) => Promise<any>
  visitId?: string
  caseId: string
  itineraryId: string
}

const ButtonWrap = styled.div`
  margin: 0 -${ themeSpacing(4) } 0 -${ themeSpacing(4) };
  padding: ${ themeSpacing(3) } ${ themeSpacing(4) } ${ themeSpacing(3) } ${ themeSpacing(4) };
  border-bottom: 1px solid ${ themeColor("tint", "level3") };
  background-color: ${ themeColor("tint", "level2") };
  text-align: right;
`

const NoteWizard: React.FC<Props> = ({ itineraryId, caseId, onSubmit, valuesFromApi, visitId }) => {
  const { data: itinerary } = useItinerary(itineraryId)
  const { pushStep, popStep, getCurrentStep, clearSteps, setValues, getValues: getUnsubmittedValues } = useNoteWizard(caseId)
  const user = useLoggedInUser()

  const itineraryItem = itinerary?.items.find(item => item.case.case_id === caseId) as ItineraryItem
  const wizardStep = getCurrentStep() ?? "stepOne"

  const handleBackButtonClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    popStep()
  }, [ popStep ])

  const handleSubmit = useCallback((values) => {
    setValues(values)

    const submit = () => onSubmit(mapPostValues(values, itineraryItem.id, itineraryItem.case.id, user!.id))
      .then(() => {
        clearSteps()
        return navigate(to("/lijst/:itineraryId/", { itineraryId }))
      })

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
        if (values.suggest_next_visit !== "unknown") {
          pushStep("nextVisit")
        } else {
          return submit()
        }
        break
      case "nextVisit":
      case "accessGranted":
        return submit()
    }

    return Promise.resolve(true)
  }, [pushStep, clearSteps, setValues, wizardStep, onSubmit, itineraryId, itineraryItem, user])

  return (
    itinerary && itineraryItem && user
      ? (
        <ScaffoldForm onSubmit={handleSubmit} initialValues={getUnsubmittedValues() ?? valuesFromApi} keepDirtyOnReinitialize={true}>
          <NodeWizardSubtitle itineraryItem={itineraryItem} />
            { valuesFromApi && visitId &&
              <ButtonWrap>
                <DeleteVisitButton caseId={caseId} itineraryId={itineraryId} visitId={visitId} />
              </ButtonWrap>
            }
          <Spacing pt={2}>
            <NoteWizardFormScaffoldFields step={wizardStep} onBackButtonClicked={handleBackButtonClick} teamSettings={itinerary.settings.team_settings} />
            <NoteWizardManager caseID={ caseId } />
          </Spacing>
        </ScaffoldForm>
      )
     : <CenteredSpinner size={60} />
  )
}

export default NoteWizard
