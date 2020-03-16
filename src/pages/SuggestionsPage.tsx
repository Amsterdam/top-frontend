import React, { FC } from "react"
import { RouteComponentProps } from "@reach/router"
import Navigation from "../components/global/Navigation"
import Suggestions from "../components/search/Suggestions"
import ErrorMessage from "../components/global/ErrorMessage"

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
      { show &&
        <Suggestions id={ id } />
      }
      { show404 &&
        <ErrorMessage text="Pagina niet gevonden" />
      }
    </>
  )
}
export default SuggestionsPage
