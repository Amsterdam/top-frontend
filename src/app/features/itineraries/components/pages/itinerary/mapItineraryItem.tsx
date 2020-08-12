import React from "react"
import { navigate } from "@reach/router"
import { Button } from "@datapunt/asc-ui"

import FraudProbability from "app/features/shared/components/atoms/FraudProbability/FraudProbability"
import StadiumBadge from "app/features/shared/components/molecules/StadiumBadge/StadiumBadge"
import displayAddress from "app/features/shared/utils/displayAddress"
import Spacing from "app/features/shared/components/atoms/Spacing/Spacing"
import to from "app/features/shared/routing/to"

import DeleteItineraryItemButton from "app/features/itineraries/components/molecules/DeleteItineraryItemButton/DeleteItineraryItemButton"

import { ItineraryItem } from "app/features/types"
import Notes from "../../molecules/Notes/Notes"

// const handleClick = (itineraryItemId: number, itineraryId: string, noteId?: number) => navigate(
//     noteId === undefined
//       ? to("/lijst/:itineraryId/notities/:itineraryItemId/nieuw", { itineraryItemId: itineraryItemId.toString(), itineraryId })
//       : to("/lijst/:itineraryId/notities/:itineraryItemId/:noteId", { itineraryItemId: itineraryItemId.toString(), itineraryId, noteId: noteId.toString() })
//   )

export const mapItineraryItem = (itineraryId: string, userId?: string) => ({ id, position, notes, case: { case_id, fraud_prediction, bwv_data: { street_name, street_number, suffix_letter, suffix, postal_code, case_reason, stadium } } }: ItineraryItem) => 
  //const note = notes.find(_ => _.author.id === userId)
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
    buttons: <>
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

