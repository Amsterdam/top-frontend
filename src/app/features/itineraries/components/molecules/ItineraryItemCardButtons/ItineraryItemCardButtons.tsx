import React from "react"
import useNavigation from "app/features/shared/routing/useNavigation"
import { Button, themeSpacing } from "@amsterdam/asc-ui"
import styled from "styled-components"
import Spacing from "app/features/shared/components/atoms/Spacing/Spacing"
import DeleteItineraryItemButton from "app/features/itineraries/components/molecules/DeleteItineraryItemButton/DeleteItineraryItemButton"
import CheckmarkIcon from "app/features/itineraries/components/atoms/CheckmarkIcon/CheckmarkIcon"
import ClockIcon from "app/features/itineraries/components/atoms/ClockIcon/ClockIcon"
import StyledButton from "app/features/shared/components/atoms/StyledButton/StyledButton"
import EditDocumentIcon from "app/features/itineraries/components/atoms/EditDocumentIcon/EditDocumentIcon"
import { mapDateToTime } from "app/features/visits/components/organisms/NoteWizard/utils/mapDateToTime"
import CompleteVisitButton from "./CompleteVisitButton"

type Props = {
  itineraryId: string
  itineraryItemId: number
  caseId?: string | null
  isVisitStatus: boolean
  visits: Components.Schemas.Visit[]
  onDeleteButtonClicked: () => void
}

const StyledSpan = styled.span`
  margin-left: ${ themeSpacing(3) };
`

const TextWithIcon = styled.div`
  display: flex;
  span {
    margin-right: ${ themeSpacing(2) };
  }
`

const ItineraryItemCardButtons: React.FC<Props> = (
  {
    itineraryId,
    itineraryItemId,
    caseId,
    isVisitStatus,
    visits,
    onDeleteButtonClicked
  }
) => {
  const { navigateTo } = useNavigation()
  const visit = visits?.find((e: any) => e.case_id.case_id === caseId)
  const isCompleted = visit?.completed

  const deleteButton = (
    <DeleteItineraryItemButton
      onDeleteButtonClicked={ onDeleteButtonClicked }
      id={ itineraryItemId }
    />
  )

  return visits[0] !== undefined ? (
    <>
      <Spacing pb={ 2 }>
        <TextWithIcon>
          {isCompleted ? (
            <>
              <CheckmarkIcon />
              Afgerond
            </>
          ) : "Gelopen"}
        </TextWithIcon>
      </Spacing>
      <Spacing pb={ 2 }>
        <TextWithIcon><ClockIcon />{ mapDateToTime(visits[0].start_time) }</TextWithIcon>
      </Spacing>
      { !isCompleted && (
        <>
          <Spacing pb={ 2 }>
            <StyledButton
              onClick={ () => navigateTo("/visit/:itineraryId/:caseId/:id", { caseId, itineraryId, id: visits[0].id }) }
              variant="blank"
              icon={ <EditDocumentIcon /> }
            />
            <StyledSpan>
              { deleteButton }
            </StyledSpan>
          </Spacing>
          { visit && <CompleteVisitButton visit={ visit } itineraryId={ itineraryId } /> }
        </>
      )}
    </>
  ) : (
    <>
      { isVisitStatus && (
          <Spacing pb={ 2 }>
            <Button
              variant="secondary"
              onClick={ () => navigateTo("/visit/:itineraryId/:caseId", { caseId, itineraryId }) }
            >
              Bezoek
            </Button>
          </Spacing>
      )}
      <Spacing pb={ 2 }>
        { deleteButton }
      </Spacing>
    </>
  )
}

export default ItineraryItemCardButtons
