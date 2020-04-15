import React, { FC } from "react"
import { Search as SearchIcon } from "@datapunt/asc-assets"
import { to } from "../../../config/page"
import { isPage, isHomePage } from "../../../config/page"
import useGlobalState from "../../../hooks/useGlobalState"
import NavigationWrap from "./NavigationWrap"

const Navigation: FC = () => {
  const {
    itineraries: {
      itineraries
    }
  } = useGlobalState()

  const numItineraries = itineraries !== undefined ? itineraries.length : 0
  const titleHome = numItineraries === 1 ? "Mijn looplijst" : "Mijn looplijsten"
  const numItineraryItems = itineraries !== undefined ? itineraries.map(itinerary => itinerary.items).flat(1).length : 0
  const showCounter = numItineraries === 1 && numItineraryItems > 0

  const homeActive = isHomePage()
  const searchActive = isPage("zoeken") || isPage("parse")

  const d = 24
  const menuItems = [
    { to: to(), text: `${ titleHome }${ showCounter ? ` (${ numItineraryItems })` : "" }`, isActive: homeActive },
    { to: to("zoeken"), text: <SearchIcon width={ d } height={ d } />, isActive: searchActive }
  ]

  return <NavigationWrap menuItems={ menuItems } />
}
export default Navigation
