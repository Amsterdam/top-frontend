import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import Search from "../components/search/Search"
import Navigation from "../components/global/navigation/Navigation"
// @TODO: Move this to Search Component
import ItinerarySearchResultButtons from "../components/search/itinerary/ItinerarySearchResultButtons"
import { IsFetchingSpinner } from "../components/atoms/PageSpinner/IsFetchingSpinner"

type Props = RouteComponentProps

const SearchPage: FC<Props> = () => (
    <>
      <Navigation />
      <IsFetchingSpinner>
        <Search actionButtonsComponent={ItinerarySearchResultButtons} />
      </IsFetchingSpinner>
    </>
  )

export default SearchPage
