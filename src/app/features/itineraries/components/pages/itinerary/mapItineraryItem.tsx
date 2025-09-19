import React from "react"

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
        address: {
          street_name, number, suffix_letter, suffix, postal_code
        },
        workflows,
        reason,
        project,
        schedules,
        tags,
        deleted
      },
      id: caseId
    },
    id,
    position,
    visits
  }: ItineraryItem) => {
  const statusName = workflows?.length > 0 ? workflows[0].state.name ?? "" : undefined
  const badge = statusName
    ? <StadiumBadge stadium={statusName} />
    : undefined

  const isVisitStatus = workflows?.some(
    workflow => workflow?.state?.name?.includes("Huisbezoek") ||
      workflow?.state?.name?.includes("Hercontrole")
  ) || false

  return {
    address: displayAddress(street_name, number, suffix_letter, suffix),
    badge,
    daySettings,
    href: to("/cases/:id", { id: caseId.toString() ?? "" }),
    id: id.toString(),
    isVisited: visits.length > 0,
    itemId: id.toString(),
    notes: visits[0]?.personal_notes
      ? <Notes note={visits[0].personal_notes} />
      : undefined,
    position,
    postalCode: postal_code,
    project,
    reason,
    tags,
    hasPriority: (schedules && schedules[0]?.priority?.weight >= 0.5) ?? false,
    hasWarrant: (schedules && schedules[0]?.priority?.weight >= 1.0) ?? false,
    buttons: (onDeleteButtonClicked: () => void) =>
      <ItineraryItemCardButtons
        caseId={caseId.toString()}
        itineraryId={itineraryId}
        itineraryItemId={id}
        isVisitStatus={isVisitStatus}
        onDeleteButtonClicked={onDeleteButtonClicked}
        visits={visits}
      />,
    deleted
  }
}
