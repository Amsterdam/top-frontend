import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import Navigation from "../components/global/Navigation"
import Generate from "../components/itineraries/Generate"

const GeneratePage: FC<RouteComponentProps> = () => {
  return (
    <>
      <Navigation />
      <Generate />
    </>
  )
}

export default GeneratePage
