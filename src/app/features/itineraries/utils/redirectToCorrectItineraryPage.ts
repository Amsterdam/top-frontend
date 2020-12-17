import { Itinerary } from "app/features/types"
import { navigate } from "@reach/router"
import to from "app/features/shared/routing/to"

export const redirectToCorrectItineraryPage = (itineraries?: Itinerary[], itineraryId?: string) => {
  if (!itineraries) {
    return
  }

  if (itineraries.length === 0) {
    navigate(to("/lijst-instellingen"))
  }

  if (itineraries.length === 1) {
    navigate(to("/lijst/:itineraryId", { itineraryId: itineraries[0].id.toString() }))
  }

  if (itineraries.length > 1 && !itineraryId) {
    navigate(to("/kies-looplijst"))
  }
}
