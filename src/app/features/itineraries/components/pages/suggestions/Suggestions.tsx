import React, { useMemo } from "react"
import { useSuggestions } from "app/state/rest"
import { useItinerary } from "app/state/rest/custom/useItinerary"
import ItineraryItemCardList from "app/features/itineraries/components/organisms/ItineraryItemCardList/ItineraryItemCardList"
import { casesToCardCaseProps } from "app/features/itineraries/utils/mapCaseToCardProps"
import CenteredSpinner from "app/features/shared/components/atoms/CenteredSpinner/CenteredSpinner"

type Props = {
  itineraryId: number
  lat?: string
  lng?: string
}

const Suggestions: React.FC<Props> = ({ itineraryId, lat = "", lng = "" }) => {
  const { data: itinerary } = useItinerary(itineraryId)
  const { data, isBusy } = useSuggestions(itineraryId, lat, lng)

  const items = useMemo(
    () => casesToCardCaseProps(data?.cases, itinerary, true),
    [itinerary, data]
  )

  return (
    <>
      { isBusy && <CenteredSpinner explanation="Zaken ophalen…" size={ 60 } /> }
      { items.length > 0
        ? <ItineraryItemCardList items={ items } title="Zaken rondom de adressen in je lijst:" />
        : !isBusy
          ? <p>Geen resultaten gevonden.</p>
          : null
      }
    </>
  )
}

export default Suggestions
