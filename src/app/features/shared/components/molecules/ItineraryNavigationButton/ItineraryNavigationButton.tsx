import React from "react"
import { Link } from "@reach/router"
import {Spinner} from "@datapunt/asc-ui"

import {useItineraries } from "app/state/rest"
import to from "app/features/shared/routing/to"

const ItineraryNavigationButton:React.FC = () => {
  const { data } = useItineraries()

  const numItineraries = data?.itineraries?.length
  const numItems = data?.itineraries.map(_ => _.items).flat(1).length

  if (numItineraries > 1) {
    return <Link to={to(`/`, { id: data.itineraries[0].id.toString() })}>
      Mijn looplijsten ({ numItems })
    </Link>
  } else if (numItineraries === 1) {
    return <Link to={to(`/lijst/:itineraryId/`, { itineraryId: data.itineraries[0].id.toString() })}>
      Mijn looplijst ({ numItems })
    </Link>
  } else if(numItineraries === 0) {
    return <Link to={to(`/lijst/nieuw/`)}>Nieuwe looplijst</Link>
  } else {
    return <Spinner />
  }
}

export default ItineraryNavigationButton
