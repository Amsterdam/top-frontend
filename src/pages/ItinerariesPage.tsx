import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import ItinerariesMain from "../components/itineraries/ItinerariesMain"
import Navigation from "../components/global/Navigation"

const ItinerariesPage: FC<RouteComponentProps> = () => {
  return (
    <>
      <Navigation />
      <ItinerariesMain />
    </>
  )
}
export default ItinerariesPage
