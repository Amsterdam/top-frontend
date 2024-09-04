import React, { useCallback } from "react"
import { themeColor, themeSpacing } from "@amsterdam/asc-ui"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"
import styled from "styled-components"
import { ItineraryItem } from "app/features/types"
import { useLoggedInUser } from "app/state/rest/custom/useLoggedInUser"
import { useItinerary } from "app/state/rest/custom/useItinerary"
import useNavigation from "app/features/shared/routing/useNavigation"
import CenteredSpinner from "app/features/shared/components/atoms/CenteredSpinner/CenteredSpinner"
import Spacing from "app/features/shared/components/atoms/Spacing/Spacing"
import { useNoteWizard } from "./hooks/useNoteWizard"
import NoteWizardManager from "app/features/visits/components/organisms/NoteWizard/components/NoteWizardManager"
import NoteWizardFormScaffoldFields from "./components/NoteWizardFormScaffoldFields"
import NodeWizardSubtitle from "./components/NoteWizardSubtitle"
import DeleteVisitButton from "app/features/visits/components/molecules/DeleteVisitButton/DeleteVisitButton"
import { mapPostValues } from "./utils/mapValues"
import { FormValues } from "app/features/visits/components/organisms/NoteWizard/types"
import { useItineraries, useItineraryItem } from "app/state/rest"
import calculateNewPosition from "app/features/itineraries/components/organisms/DraggableItineraryItemCardList/calculateNewPosition"
import { itemsPositionSorter } from "app/features/itineraries/components/organisms/DraggableItineraryItemCardList/DraggableItineraryItemCardList"

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
  const {
    pushStep,
    popStep,
    getCurrentStep,
    clearSteps,
    setValues,
    getValues: getUnsubmittedValues
  } = useNoteWizard(caseId)
  const { navigateTo } = useNavigation()
  const user = useLoggedInUser()
  const { data } = useItineraries({ lazy: true })
  const itineraryItem = itinerary?.items.find(item => item.case.id.toString() === caseId) as ItineraryItem
  const { execPatch: execPatchItineraryItem } = useItineraryItem(itineraryItem?.id ?? "", { lazy: true })

  const wizardStep = getCurrentStep() ?? "stepOne"

  const handleBackButtonClick = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    popStep()
  }, [ popStep ])

  const moveItemToBottomList = useCallback(() => {
    // Get all items from the Itinerary list.
    const items = data?.itineraries.find(_ => _.id.toString() === itineraryId)?.items ?? []
    // Sort for position like the DraggableItineraryItemCardList.
    const sortedItems = [ ...items ].sort(itemsPositionSorter)
    // Find the current index.
    const sourceIndex = sortedItems.findIndex((_) => _.case.id === itineraryItem.case.id)
    // Destination index will be the bottom of the list
    const destinationIndex = sortedItems.length - 1
    // Calculate new position with the current index and the destination index.
    const position = calculateNewPosition(sortedItems, sourceIndex, destinationIndex)
    execPatchItineraryItem({ position })
  },[data?.itineraries, execPatchItineraryItem, itineraryId, itineraryItem?.case?.id])

  const handleSubmit = useCallback((values) => {
    setValues(values)

    const submit = () => onSubmit(mapPostValues(values, itineraryItem.id, itineraryItem.case.id.toString(), user!.id))
      .then(() => {
        clearSteps()
        moveItemToBottomList()
      })
      .finally(() => navigateTo("/lijst/:itineraryId", { itineraryId }))

    switch (wizardStep) {
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
  }, [setValues, wizardStep, onSubmit, itineraryItem?.id, itineraryItem?.case?.id, user, clearSteps, moveItemToBottomList, navigateTo, itineraryId, pushStep])

  return (
    itinerary && itineraryItem && user
      ? (
        <ScaffoldForm
          onSubmit={ handleSubmit }
          initialValues={ getUnsubmittedValues() ?? valuesFromApi }
          keepDirtyOnReinitialize={ true }
        >
          <NodeWizardSubtitle itineraryItem={ itineraryItem } />
          { valuesFromApi && visitId && (
            <ButtonWrap>
              <DeleteVisitButton caseId={ caseId } itineraryId={ itineraryId } visitId={ visitId } />
            </ButtonWrap>
          )}
          <Spacing pt={ 2 }>
            <NoteWizardFormScaffoldFields
              step={ wizardStep }
              onBackButtonClicked={ handleBackButtonClick }
              daySettings={ itinerary.settings.day_settings }
            />
            <NoteWizardManager caseID={ caseId } />
          </Spacing>
        </ScaffoldForm>
      ) : <CenteredSpinner size={ 60 } />
  )
}

export default NoteWizard
