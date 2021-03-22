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
        case_reason,
        stadium,
        is_sia,
        address: {
          street_name, number, suffix_letter, suffix, postal_code
        },
        current_states,
        reason
      },
      id: caseId,
      fraud_prediction
    },
    id,
    position,
    visits
  }: ItineraryItem) =>
  ({
    address: displayAddress(street_name, number, suffix_letter, suffix),
    badge: current_states?.length > 0 ? <StadiumBadge stadium={ current_states[0].status_name || "" } /> : <StadiumBadge stadium={ stadium } />,
    daySettings,
    fraudProbability: fraud_prediction && <FraudProbability fraudProbability={ fraud_prediction?.fraud_probability } />,
    href: to("/cases/:id", { id: caseId.toString() ?? "" }),
    id: id!.toString(),
    isSia: (is_sia === "J"),
    isVisited: visits.length > 0,
    itemId: id.toString(),
    notes: visits[0]?.personal_notes
      ? <Notes note={ visits[0].personal_notes } />
      : undefined,
    position,
    postalCode: postal_code,
    reason: reason?.name || case_reason,
    buttons: (onDeleteButtonClicked: () => void) =>
      <ItineraryItemCardButtons
        caseId={ caseId.toString() }
        itineraryId={ itineraryId }
        itineraryItemId={ id }
        onDeleteButtonClicked={ onDeleteButtonClicked }
        visits={ visits }
      />
  })
