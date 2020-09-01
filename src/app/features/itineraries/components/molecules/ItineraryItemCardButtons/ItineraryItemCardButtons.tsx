import React from "react"
import { navigate } from "@reach/router"
import { Button } from "@datapunt/asc-ui"
import styled from "styled-components"

import to from "app/features/shared/routing/to"
import Spacing from "app/features/shared/components/atoms/Spacing/Spacing"
import DeleteItineraryItemButton from "app/features/itineraries/components/molecules/DeleteItineraryItemButton/DeleteItineraryItemButton"
import CheckmarkIcon from "app/features/itineraries/components/atoms/CheckmarkIcon/CheckmarkIcon"
import ClockIcon from "app/features/itineraries/components/atoms/ClockIcon/ClockIcon"
import StyledButton from "app/features/shared/components/atoms/StyledButton/StyledButton"
import EditDocumentIcon from "app/features/itineraries/components/atoms/EditDocumentIcon/EditDocumentIcon"
import { mapDateToTime } from "app/features/visits/components/organisms/NoteWizard/utils/mapDateToTime"

type Props = {
  itineraryId: string
  itineraryItemId: number
  caseId?: string | null
  visits: Components.Schemas.VisitRelated[]
  onDeleteButtonClicked: () => void
}

const TextWithIcon = styled.div`
  display: flex;
  span {
    margin-right: 16px;
  }
`

const ItineraryItemCardButtons: React.FC<Props> = ({ itineraryId, itineraryItemId, caseId, visits, onDeleteButtonClicked }) => {
  return visits[0] !== undefined ?
    <>
      <Spacing pb={2}>
        <TextWithIcon><CheckmarkIcon />Gelopen</TextWithIcon>
      </Spacing>
      <Spacing pb={2}>
        <TextWithIcon><ClockIcon />{ mapDateToTime(visits[0].start_time) }</TextWithIcon>
      </Spacing>
      <Spacing pb={2}>
        <StyledButton
          onClick={ () => navigate(to("/visit/:itineraryId/:caseId/:id", { caseId, itineraryId, id: visits[0].id })) }
          variant="blank"
          icon={ <EditDocumentIcon /> } />
      </Spacing>
    </>
    :
    <>
      <Spacing pb={2}>
        <Button variant="secondary" onClick={() => navigate(to("/visit/:itineraryId/:caseId", { caseId, itineraryId }))}>Bezoek</Button>
      </Spacing>
      <Spacing pb={2}>
        <DeleteItineraryItemButton onDeleteButtonClicked={onDeleteButtonClicked} id={itineraryItemId}/>
      </Spacing>
    </>
}
export default ItineraryItemCardButtons
