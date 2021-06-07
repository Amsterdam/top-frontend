import React, { useMemo } from "react"
import { useParams } from "@reach/router"

import { useSearch } from "app/state/rest"
import { useItinerary } from "app/state/rest/custom/useItinerary"
import { ApiName } from "app/features/types"
import { casesToCardCaseProps } from "app/features/itineraries/utils/mapCaseToCardProps"
import ItineraryItemCardList
  from "app/features/itineraries/components/organisms/ItineraryItemCardList/ItineraryItemCardList"

type Props = {
  apiName: ApiName
  postalCode?: string
  streetName?: string
  streetNumber: number
  suffix?: string
  teamName?: string
}

const SearchResults: React.FC<Props> = ({ apiName, postalCode, streetName, streetNumber, suffix, teamName }) => {
  const { itineraryId } = useParams()
  const { data: itinerary } = useItinerary(itineraryId!)
  const apiVersion = (apiName === "AZA") ? "v2" : "v1"

  const { data, isBusy } = useSearch(streetNumber, postalCode, streetName, suffix, teamName, { apiVersion })
  const items = useMemo(() => casesToCardCaseProps(data?.cases, itinerary), [ itinerary, data ])

  const title = `Zaken gevonden in ${ apiName }:`

  return (items.length > 0)
    ? <ItineraryItemCardList items={ items } title={ title } />
    : isBusy
      ? null
      : <p>Geen resultaten in { apiName }.</p>
}

export default SearchResults
