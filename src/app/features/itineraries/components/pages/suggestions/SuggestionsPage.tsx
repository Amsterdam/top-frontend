import React, {useMemo} from "react"
import { RouteComponentProps } from "@reach/router"

import {useSuggestions} from "app/state/rest"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import ItineraryItemCardList from "app/features/itineraries/components/organisms/ItineraryItemCardList/ItineraryItemCardList";
import CenteredSpinner from "app/features/shared/components/atoms/CenteredSpinner/CenteredSpinner";

import { casesToCardCaseProps } from "app/features/itineraries/utils/mapCaseToCardProps"

import {useItinerary} from "app/state/rest/custom/useItinerary";

type Props = {
  itineraryId: string
}

const SuggestionsPage:React.FC<RouteComponentProps<Props>> = ({ itineraryId }) => {
  const { data: itinerary } = useItinerary(parseInt(itineraryId!))
  const { data, isBusy } = useSuggestions(parseInt(itineraryId!))

  const items = useMemo(() => casesToCardCaseProps(data?.cases, itinerary), [itinerary, data])

  return <DefaultLayout>
    <h1>Voeg een adres toe</h1>
    <p>Adressen rondom de adressen in je lijst:</p>
    { isBusy && <CenteredSpinner size={60} /> }
    { items.length > 0
      ? <ItineraryItemCardList items={items}/>
      : !isBusy
        ? <p>Geen resultaat</p>
        : null
    }
  </DefaultLayout>

}

export default SuggestionsPage
