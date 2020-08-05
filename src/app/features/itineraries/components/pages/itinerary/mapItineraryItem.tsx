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

export const mapItineraryItem = (itineraryId: string) => ({ id, position, case: { case_id, fraud_prediction, bwv_data: { street_name, street_number, suffix_letter, suffix, postal_code, case_reason, stadium } } }: ItineraryItem) => ({
  itineraryId,
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
      <Button as="span" variant="secondary" onClick={() => navigate(to("/visit/:caseId", { caseId: case_id }))}>Bezoek</Button>
    </Spacing>
    <Spacing pb={2}>
      <DeleteItineraryItemButton id={id}/>
    </Spacing>
  </>
})
