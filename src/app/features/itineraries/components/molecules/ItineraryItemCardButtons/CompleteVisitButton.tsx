import React from "react"
import { Button, themeSpacing } from "@amsterdam/asc-ui"
import styled from "styled-components"
import { useVisit, useItineraries, useItineraryItem } from "app/state/rest"
import CheckmarkIcon from "app/features/itineraries/components/atoms/CheckmarkIcon/CheckmarkIcon"
import calculateNewPosition from "app/features/itineraries/components/organisms/DraggableItineraryItemCardList/calculateNewPosition"
import { itemsPositionSorter } from "app/features/itineraries/components/organisms/DraggableItineraryItemCardList/DraggableItineraryItemCardList"

type Props = {
  visit: Components.Schemas.Visit
  itineraryId: string
}

const StyledSpan = styled.span`
  margin-left: ${ themeSpacing(2) };
`

const CompleteVisitButton: React.FC<Props> = ({ visit, itineraryId }) => {
  const { execPatch: execPatchVisit, isBusy } = useVisit(visit.id)
  const { data } = useItineraries({ lazy: true })
  const { execPatch: execPatchItineraryItem } = useItineraryItem(visit.itinerary_item ?? "", { lazy: true })

  const moveItemToBottomList = () => {
    // Get all items from the Itinerary list.
    const items = data?.itineraries.find(_ => _.id.toString() === itineraryId)?.items ?? []
    // Sort for position like the DraggableItineraryItemCardList.
    const sortedItems = [ ...items ].sort(itemsPositionSorter)
    // Find the current index.
    const sourceIndex = sortedItems.findIndex((_) => _.case.id === visit.case_id.case_id)
    // Destination index will be the bottom of the list
    const destinationIndex = sortedItems.length - 1
    // Calculate new position with the current index and the destination index.
    const position = calculateNewPosition(sortedItems, sourceIndex, destinationIndex)
    execPatchItineraryItem({ position })
  }

  const completeVisit = () => {
    execPatchVisit({ completed: true }).then(() => {
      moveItemToBottomList()
    })
  }

  return (
    <Button
      variant="secondary"
      onClick={ completeVisit }
      disabled={ isBusy }
    >
      <CheckmarkIcon />
      <StyledSpan>Afronden</StyledSpan>
    </Button>
  )
}

export default CompleteVisitButton
