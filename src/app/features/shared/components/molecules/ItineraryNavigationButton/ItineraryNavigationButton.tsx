import React from "react"
import { Link } from "@reach/router"

import { useItineraries } from "app/state/rest"
import to from "app/features/shared/routing/to"

const ItineraryNavigationButton: React.FC = () => {
  const { data } = useItineraries({ keepUsingInvalidCache: true })

  const numItineraries = data?.itineraries?.length ?? 0
  const numItems = data?.itineraries.map(_ => _.items).flat(1).length

  if (numItineraries > 1) {
    return <Link to={ to("/") }>
      Mijn looplijsten ({ numItems })
    </Link>
  }

  if (numItineraries === 1) {
    return <Link to={ to("/lijst/:itineraryId/", { itineraryId: data?.itineraries[0].id.toString() }) }>
      Mijn looplijst ({ numItems })
    </Link>
  }

  if (numItineraries === 0) {
    return <Link to={ to("/lijst-instellingen/") }>Genereer looplijst</Link>
  }

  return null
}

export default ItineraryNavigationButton
