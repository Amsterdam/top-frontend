import React from "react"

import StadiumBadge from "app/features/shared/components/molecules/StadiumBadge/StadiumBadge"
import ItineraryItemCard from "app/features/shared/components/molecules/ItineraryItemCard/ItineraryItemCard"
import displayAddress from "app/features/shared/utils/displayAddress"

import DeleteItineraryItemButton from "../components/molecules/DeleteItineraryItemButton/DeleteItineraryItemButton"
import AddItineraryItemButton from "../components/molecules/AddItineraryItemButton/AddItineraryItemButton"
import FraudProbability from "app//features/shared/components/atoms/FraudProbability/FraudProbability"
import { Case, Itinerary, ItineraryItem } from "app/features/types"
import to from "../../shared/routing/to"

export const casesToCardCaseProps = (cases?: Case[], itinerary?: Itinerary, addDistance: boolean = false) => {
  if (!cases) {
    return []
  }

  const caseIdMap = getCaseIdMap((itinerary?.items ?? []) as unknown as ItineraryItem[])
  return cases.map(mapCaseToCardProps(itinerary?.id, caseIdMap, addDistance))
}

const getCaseIdMap = (items: ItineraryItem[]) =>
  items.reduce((acc, item) => ({ ...acc, [item.case.case_id ?? ""]: item.id }), {}
  )

const mapCaseToCardProps = (itineraryId: number | undefined, itineraryItemIds: Record<string, number>, addDistance: boolean = false) => (
  {
    case_id,
    street_name,
    street_number,
    suffix_letter,
    suffix,
    postal_code,
    case_reason,
    stadium,
    fraud_prediction,
    distance
  }: any): React.ComponentProps<typeof ItineraryItemCard> => ({
  href: to("/cases/:id", { id: case_id }),
  backgroundColor: "level2",
  address: displayAddress(street_name, street_number, suffix_letter, suffix),
  postalCode: postal_code,
  reason: case_reason,
  badge: <StadiumBadge stadium={ stadium } />,
  fraudProbability: <FraudProbability fraudProbability={ fraud_prediction?.fraud_probability } />,
  buttons: (onDeleteButtonClick: () => void) => <>
    { addDistance && distance && itineraryId && Object.keys(itineraryItemIds).length > 0 && <p>{ Math.round(distance) }m</p> }
    { itineraryItemIds[case_id]
      ? <DeleteItineraryItemButton onDeleteButtonClicked={ onDeleteButtonClick } id={ itineraryItemIds[case_id]! } />
      : itineraryId ? <AddItineraryItemButton caseId={ case_id } itinerary={ itineraryId } /> : null
    }
  </>
})
