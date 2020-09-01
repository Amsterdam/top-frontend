import React from "react"
import { Link } from "@reach/router"


import { useItineraries } from "app/state/rest"
import to from "app/features/shared/routing/to"
import styled from "styled-components"

const Wrapper = styled.div`
  min-width: 160px;
`

const ItineraryNavigationButton: React.FC = () => {
  const { data } = useItineraries({ keepUsingInvalidCache: true })

  const numItineraries = data?.itineraries?.length ?? 0
  const numItems = data?.itineraries.map(_ => _.items).flat(1).length

  if (numItineraries > 1) {
    return <Wrapper><Link to={to("/")}>
      Mijn looplijsten ({ numItems })
    </Link></Wrapper>
  } else if (numItineraries === 1) {
    return <Wrapper><Link to={to("/lijst/:itineraryId/", { itineraryId: data?.itineraries[0].id.toString() })}>
      Mijn looplijst ({ numItems })
    </Link></Wrapper>
  } else if(numItineraries === 0) {
    return <Wrapper><Link to={to("/lijst/nieuw/")}>Nieuwe looplijst</Link></Wrapper>
  } else {
    return <Wrapper><Link to={to("/")}>Mijn looplijst</Link></Wrapper>
  }
}

export default ItineraryNavigationButton
