import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import Search from "../components/search/Search"
import Navigation from "../components/global/Navigation"
import ItinerarySearchResultButtons from "../components/search/itinerary/ItinerarySearchResultButtons"

type Props = RouteComponentProps

const SearchPage: FC<Props> = () => (
    <>
      <Navigation />
      <Search actionButtonsComponent={ItinerarySearchResultButtons} />
    </>
  )

export default SearchPage
