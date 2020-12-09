import React, { useMemo } from "react"
import { useParams } from "@reach/router"
import { Heading } from "@amsterdam/asc-ui"

import { useOpenIssues } from "app/state/rest"
import { useItinerary } from "app/state/rest/custom/useItinerary"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import ItineraryItemCardList from "app/features/itineraries/components/organisms/ItineraryItemCardList/ItineraryItemCardList"
import { casesToCardCaseProps } from "app/features/itineraries/utils/mapCaseToCardProps"

import formatDate from "app/features/shared/utils/formatDate"
import currentDate from "app/features/shared/utils/currentDate"
import CenteredSpinner from "app/features/shared/components/atoms/CenteredSpinner/CenteredSpinner"

const OpenIssuesPage: React.FC = () => {
  const { itineraryId } = useParams()
  const { data: itinerary, isBusy } = useItinerary(itineraryId)
  const { data } = useOpenIssues(itineraryId)

  const cardListItems = useMemo(() => casesToCardCaseProps(data?.cases, itinerary), [itinerary, data])
  const date = formatDate(currentDate(), true, false)

  const hasCases = data && data.cases.length > 0

  return (
    <DefaultLayout>
      { isBusy && <CenteredSpinner size={60} /> }
      { hasCases
        ?
        <>
          <Heading>Open issuemeldingen { date }</Heading>
          <p>Deze issuemeldingen zijn vandaag nog beschikbaar, voeg ze toe aan je lijst.</p>
          <ItineraryItemCardList items={cardListItems}/>
        </>
        :
        <>
          <Heading>Open issuemeldingen { date }</Heading>
          <p>Geen issuemeldingen beschikbaar.</p>
        </>
      }
    </DefaultLayout>
  )
}

export default OpenIssuesPage
