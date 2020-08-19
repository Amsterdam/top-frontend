import React from "react"
import { navigate } from "@reach/router"
import { Button } from "@datapunt/asc-ui"
import styled from "styled-components"

import FraudProbability from "app/features/shared/components/atoms/FraudProbability/FraudProbability"
import StadiumBadge from "app/features/shared/components/molecules/StadiumBadge/StadiumBadge"
import displayAddress from "app/features/shared/utils/displayAddress"
import Spacing from "app/features/shared/components/atoms/Spacing/Spacing"
import to from "app/features/shared/routing/to"

import DeleteItineraryItemButton from "app/features/itineraries/components/molecules/DeleteItineraryItemButton/DeleteItineraryItemButton"
import CheckmarkIcon from "app/features/itineraries/components/atoms/CheckmarkIcon/CheckmarkIcon"
import ClockIcon from "app/features/itineraries/components/atoms/ClockIcon/ClockIcon"

import { ItineraryItem } from "app/features/types"
import Notes from "../../molecules/Notes/Notes"

import { mapDateToTime } from "app/features/visits/components/organisms/NoteWizard/utils/mapDateToTime"

const TextWithIcon = styled.div`
  display: flex;
  span {
    margin-right: 16px;
  }
`

export const mapItineraryItem = (itineraryId: string) => ({ id, position, notes, visits, case: { case_id, fraud_prediction, bwv_data: { street_name, street_number, suffix_letter, suffix, postal_code, case_reason, stadium } } }: ItineraryItem) =>
  ({
    href: to("/lijst/:itineraryId/cases/:id", { itineraryId, id: case_id ?? "" }),
    position,
    id: case_id!,
    itemId: id.toString(),
    address: displayAddress(street_name, street_number, suffix_letter, suffix),
    postalCode: postal_code,
    reason: case_reason,
    badge: <StadiumBadge stadium={stadium} />,
    fraudProbability: <FraudProbability fraudProbability={fraud_prediction?.fraud_probability} />,
    buttons:
      visits.length ?
      <>
        <Spacing pb={2}>
          <TextWithIcon><CheckmarkIcon />Gelopen</TextWithIcon>
        </Spacing>
        <Spacing pb={2}>
          <TextWithIcon><ClockIcon />{ visits[0] ? mapDateToTime(visits[0].start_time) : "--:--" }</TextWithIcon>
        </Spacing>
        <Spacing pb={2}>
          <Button variant="secondary" onClick={() => navigate(to("/visit/:itineraryId/:caseId/:id", { caseId: case_id, itineraryId: itineraryId, id: visits[0]?.id }))}>Wijzig bezoek</Button>
        </Spacing>
      </>
      :
      <>
        <Spacing pb={2}>
          <Button variant="secondary" onClick={() => navigate(to("/visit/:itineraryId/:caseId", { caseId: case_id, itineraryId: itineraryId }))}>Bezoek</Button>
        </Spacing>
        <Spacing pb={2}>
          <DeleteItineraryItemButton id={id}/>
        </Spacing>
      </>,
    notes: notes.length > 0
      ? <Notes notes={notes} />
      : undefined
  })
