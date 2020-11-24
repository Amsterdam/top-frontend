import React from "react"

import FraudProbability from "app/features/shared/components/atoms/FraudProbability/FraudProbability"
import StadiumBadge from "app/features/shared/components/molecules/StadiumBadge/StadiumBadge"
import displayAddress from "app/features/shared/utils/displayAddress"
import to from "app/features/shared/routing/to"

import { ItineraryItem } from "app/features/types"
import ItineraryItemCardButtons from "../../molecules/ItineraryItemCardButtons/ItineraryItemCardButtons"
import Notes from "../../molecules/Notes/Notes"

export const mapItineraryItem = (itineraryId: string, daySettings: Components.Schemas.DaySettings) => ({
  id,
  position,
  visits,
  case: {
    case_id,
    fraud_prediction,
    bwv_data: { street_name, street_number, suffix_letter, suffix, postal_code, case_reason, stadium, is_sia } }
  }: ItineraryItem) =>
  ({
    href: to("/cases/:id", { id: case_id ?? "" }),
    position,
    id: case_id!,
    itemId: id.toString(),
    address: displayAddress(street_name, street_number, suffix_letter, suffix),
    postalCode: postal_code,
    reason: case_reason,
    badge: <StadiumBadge stadium={stadium} />,
    fraudProbability: <FraudProbability fraudProbability={fraud_prediction?.fraud_probability} />,
    isVisited: visits.length > 0,
    buttons: (onDeleteButtonClicked: () => void) => <ItineraryItemCardButtons onDeleteButtonClicked={onDeleteButtonClicked} itineraryId={ itineraryId } itineraryItemId={ id } caseId={ case_id } visits={ visits } />,
    daySettings,
    notes: visits[0]?.personal_notes 
      ? <Notes note={ visits[0].personal_notes } />
      : undefined,
    isSia: is_sia
  })
