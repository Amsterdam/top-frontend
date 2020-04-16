import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import Navigation from "../components/global/navigation/Navigation"
import Issues from "../components/search/Issues"

const SuggestionsPage: FC<RouteComponentProps> = () => (
    <>
      <Navigation />
      <Issues />
    </>
  )
export default SuggestionsPage
