import React from "react"

import StadiumBadge from "app/features/shared/components/molecules/StadiumBadge/StadiumBadge"
import ItineraryItemCard from "app/features/shared/components/molecules/ItineraryItemCard/ItineraryItemCard"
import displayAddress from "app/features/shared/utils/displayAddress"
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
  items.reduce((acc, item) => ({ ...acc, [item.case.id ?? ""]: item.id }), {})

const mapCaseToCardProps = (itineraryId: number | undefined, itineraryItemIds: Record<string, number>, addDistance: boolean = false) =>
  ({
     address,
     case_reason,
     current_states,
     distance,
     fraud_prediction,
     id,
     reason,
     schedules,
     stadium,
     teams
   }: any): React.ComponentProps<typeof ItineraryItemCard> =>
  {
    const addressObject = displayAddress(
      address?.street_name,
      address?.number,
      address?.suffix_letter,
      address?.suffix
    )

    const badge = current_states && current_states.length > 0
      ? <StadiumBadge stadium={ current_states[0].status_name || "" } />
      : <StadiumBadge stadium={ stadium } />

    const teamMembersList = teams?.length ? teams[0].map((team: { user: { full_name: string } }) => team.user.full_name).join(", ") : ""

    const buttons = (onDeleteButtonClick: () => void) => (
      <>
        { addDistance && distance && itineraryId && Object.keys(itineraryItemIds).length &&
        <p>{ Math.round(distance) }m</p> }
        { !teams?.length && itineraryId
          ? <AddItineraryItemButton caseId={ id } itinerary={ itineraryId } />
          : null
        }
      </>
    )

    return {
      address: addressObject,
      backgroundColor: "level2",
      badge,
      buttons,
      fraudProbability: <FraudProbability fraudProbability={ fraud_prediction?.fraud_probability } />,
      hasPriority: (schedules && schedules[0]?.priority?.weight >= 0.5) ?? false,
      href: to("/cases/:id", { id }),
      postalCode: address.postal_code,
      reason: reason?.reason || case_reason,
      teamMembersList
    }
  }
