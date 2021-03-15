import React from "react"

import FraudProbability from "app/features/shared/components/atoms/FraudProbability/FraudProbability"
import StadiumBadge from "app/features/shared/components/molecules/StadiumBadge/StadiumBadge"
import displayAddress from "app/features/shared/utils/displayAddress"
import to from "app/features/shared/routing/to"

import { ItineraryItem } from "app/features/types"
import ItineraryItemCardButtons from "../../molecules/ItineraryItemCardButtons/ItineraryItemCardButtons"
import Notes from "../../molecules/Notes/Notes"

export const mapItineraryItem = (itineraryId: string, daySettings: Components.Schemas.DaySettings) => (
  {
    case: {
      data: {
        street_name, street_number, suffix_letter, suffix, postal_code, case_reason, stadium, is_sia
      },
      case_id,
      fraud_prediction
    },
    id,
    position,
    visits
  }: ItineraryItem) =>
  ({
    address: displayAddress(street_name, street_number, suffix_letter, suffix),
    badge: <StadiumBadge stadium={ stadium } />,
    daySettings,
    fraudProbability: <FraudProbability fraudProbability={ fraud_prediction?.fraud_probability } />,
    href: to("/cases/:id", { id: case_id ?? "" }),
    id: case_id!,
    isSia: (is_sia === "J"),
    isVisited: visits.length > 0,
    itemId: id.toString(),
    notes: visits[0]?.personal_notes
      ? <Notes note={ visits[0].personal_notes } />
      : undefined,
    position,
    postalCode: postal_code,
    reason: case_reason,
    buttons: (onDeleteButtonClicked: () => void) =>
      <ItineraryItemCardButtons
        caseId={ case_id }
        itineraryId={ itineraryId }
        itineraryItemId={ id }
        onDeleteButtonClicked={ onDeleteButtonClicked }
        visits={ visits }
      />
  })
