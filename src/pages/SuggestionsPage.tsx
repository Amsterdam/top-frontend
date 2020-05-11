import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import Navigation from "../components/global/navigation/Navigation"
import Suggestions from "../components/search/Suggestions"
import ErrorMessage from "../components/global/ErrorMessage"
import { IsFetchingSpinner } from "../components/atoms/PageSpinner/IsFetchingSpinner"

type Props = RouteComponentProps & {
  id?: string
}

const SuggestionsPage: FC<Props> = ({ id: idString = "" }) => {
  const id = parseInt(idString, 10)
  const show = !Number.isNaN(id)
  const show404 = !show

  return (
    <>
      <Navigation />
      <IsFetchingSpinner>
        { show &&
        <Suggestions id={ id } />
        }
        { show404 &&
        <ErrorMessage text="Pagina niet gevonden" />
        }
      </IsFetchingSpinner>
    </>
  )
}
export default SuggestionsPage
