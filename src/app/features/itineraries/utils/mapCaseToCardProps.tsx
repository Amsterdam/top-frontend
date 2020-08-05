import React from "react"

import StadiumBadge from "app/features/shared/components/molecules/StadiumBadge/StadiumBadge"
import ItineraryItemCard from "app/features/shared/components/molecules/ItineraryItemCard/ItineraryItemCard"
import displayAddress from "app/features/shared/utils/displayAddress"

import DeleteItineraryItemButton from "../components/molecules/DeleteItineraryItemButton/DeleteItineraryItemButton"
import AddItineraryItemButton from "../components/molecules/AddItineraryItemButton/AddItineraryItemButton"
import FraudProbability from "app//features/shared/components/atoms/FraudProbability/FraudProbability"
import { Case, ItineraryItem } from "../../types"

export const casesToCardCaseProps = (cases: Case[], itinerary?: Components.Schemas.Itinerary) => {
  if (!itinerary || !cases) {
    return []
  }

  const caseIdMap = getCaseIdMap(itinerary.items as unknown as ItineraryItem[])
  return cases.map(mapCaseToCardProps(itinerary.id, caseIdMap))
}

const getCaseIdMap = (items: ItineraryItem[]) =>
  items.reduce((acc, item) => ({ ...acc, [item.case.case_id ?? ""]: item.id }), {}
)

const mapCaseToCardProps = (itineraryId: number, itineraryItemIds: Record<string, number>) => ({ case_id, street_name, street_number, suffix_letter, suffix, postal_code, case_reason, stadium, fraud_prediction }: any): React.ComponentProps<typeof ItineraryItemCard> => ({
  itineraryId: itineraryId.toString(),
  id: case_id,
  backgroundColor: "level2",
  address: displayAddress(street_name, street_number, suffix_letter, suffix),
  postalCode: postal_code,
  reason: case_reason,
  badge: <StadiumBadge stadium={stadium} />,
  fraudProbability: <FraudProbability fraudProbability={fraud_prediction?.fraud_probability} />,
  buttons: <>
    { itineraryItemIds[case_id]
      ? <DeleteItineraryItemButton id={itineraryItemIds[case_id]!} />
      : <AddItineraryItemButton caseId={case_id} itinerary={itineraryId} />
    }
  </>
})
