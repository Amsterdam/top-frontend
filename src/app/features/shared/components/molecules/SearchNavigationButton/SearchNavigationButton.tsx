import React from "react"
import { Link } from "@reach/router"
import { Search } from "@amsterdam/asc-assets"

import { useItineraries } from "app/state/rest"
import to from "app/features/shared/routing/to"

type Props = {
  itineraryId?: string
}

const SearchNavigationButton: React.FC<Props> = ({ itineraryId }) => {
  const { data } = useItineraries()

  // Get itinerary id if present – e.g. when searching from CaseDetailPage.
  if (!itineraryId && data?.itineraries.length === 1) {
    itineraryId = data.itineraries[0].id.toString()
  }

  const href = itineraryId
    ? to("/lijst/:itineraryId/zoeken", { itineraryId })
    : to("/zoeken")

  return (
    <Link to={ href }>
      <Search width={ 24 } height={ 24 } />
    </Link>
  )
}

export default SearchNavigationButton
