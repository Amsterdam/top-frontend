import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import Navigation from "../components/global/navigation/Navigation"
import Issues from "../components/search/Issues"
import { IsFetchingSpinner } from "../components/atoms/PageSpinner/IsFetchingSpinner"

const SuggestionsPage: FC<RouteComponentProps> = () => (
    <>
      <Navigation />
      <IsFetchingSpinner>
        <Issues />
      </IsFetchingSpinner>
    </>
  )
export default SuggestionsPage
