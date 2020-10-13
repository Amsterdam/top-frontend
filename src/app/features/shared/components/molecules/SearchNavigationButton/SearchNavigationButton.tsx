import React from "react"
import { Link } from "@reach/router"
import { Search } from "@amsterdam/asc-assets"

import to from "app/features/shared/routing/to"

type Props = {
  itineraryId?: string
}

const SearchNavigationButton: React.FC<Props> = ({ itineraryId }) => {
  const href = itineraryId
    ? to("/lijst/:itineraryId/zoeken/", { itineraryId })
    : to("/zoeken/")

  return <Link to={href}><Search width={ 24 } height={ 24 } /></Link>
}

export default SearchNavigationButton
