import React, { useMemo } from "react"
import { useParams } from "react-router-dom"

import { useSearch } from "app/state/rest"
import { useItinerary } from "app/state/rest/custom/useItinerary"
import { casesToCardCaseProps } from "app/features/itineraries/utils/mapCaseToCardProps"
import ItineraryItemCardList from "app/features/itineraries/components/organisms/ItineraryItemCardList/ItineraryItemCardList"

type Props = {
  postalCode?: string
  streetName?: string
  streetNumber: number
  suffix?: string
  teamName?: number
}

const SearchResults: React.FC<Props> = ({
  postalCode,
  streetName,
  streetNumber,
  suffix,
  teamName
}) => {
  const { itineraryId } = useParams()
  const { data: itinerary } = useItinerary(itineraryId!)

  const { data, isBusy } = useSearch(
    streetNumber,
    postalCode,
    streetName,
    suffix,
    teamName
  )

  const items = useMemo(() => {
    if (!data?.cases) return []
    return casesToCardCaseProps(data.cases, itinerary)
  }, [itinerary, data])

  if (isBusy) return null

  if (items.length === 0) {
    return <p>Geen resultaten in AZA.</p>
  }

  return (
    <ItineraryItemCardList items={items} title="Zaken gevonden in AZA:" />
  )
}

export default SearchResults