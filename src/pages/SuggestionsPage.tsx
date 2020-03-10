import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import Navigation from "../components/global/Navigation"
import Suggestions from "../components/itineraries/Suggestions"

const SuggestionsPage: FC<RouteComponentProps> = () => {

  return (
    <>
      <Navigation />
      <Suggestions />
    </>
  )
}
export default SuggestionsPage
