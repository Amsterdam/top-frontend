import React, { useMemo } from "react"
import { RouteComponentProps } from "@reach/router"
import { Heading } from "@amsterdam/asc-ui"

import { useSuggestions } from "app/state/rest"
import { useItinerary } from "app/state/rest/custom/useItinerary"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import ItineraryItemCardList
  from "app/features/itineraries/components/organisms/ItineraryItemCardList/ItineraryItemCardList"
import { casesToCardCaseProps } from "app/features/itineraries/utils/mapCaseToCardProps"
import CenteredSpinner from "app/features/shared/components/atoms/CenteredSpinner/CenteredSpinner"

type Props = {
  itineraryId: string
}

const SuggestionsPage: React.FC<RouteComponentProps<Props>> = ({ itineraryId }) => {
  const { data: itinerary } = useItinerary(parseInt(itineraryId!))
  const { data, isBusy } = useSuggestions(parseInt(itineraryId!))

  const items = useMemo(() => casesToCardCaseProps(data?.cases, itinerary, true), [ itinerary, data ])

  return (
    <DefaultLayout>
      <Heading>Voeg een zaak toe aan je looplijst</Heading>
      { isBusy && <CenteredSpinner explanation="Zaken ophalen…" size={ 60 } /> }
      { items.length > 0
        ? <ItineraryItemCardList items={ items } title="Zaken rondom de adressen in je lijst:" />
        : !isBusy
          ? <p>Geen resultaten gevonden.</p>
          : null
      }
    </DefaultLayout>
  )
}

export default SuggestionsPage
