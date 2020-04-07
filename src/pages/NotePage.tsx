import React, { FC } from "react"
import Navigation from "../components/global/Navigation"
import { RouteComponentProps } from "@reach/router"
import Note from "../components/notes/Note"
import ErrorMessage from "../components/global/ErrorMessage"

type Props = RouteComponentProps & {
  itineraryId?: string
  id?: string
}

const NotePage: FC<Props> = ({ itineraryId: itineraryIdString, id: idString }) => {
  const itineraryId = parseInt(itineraryIdString!, 10)
  const id = idString !== undefined ? parseInt(idString, 10) : undefined
  const showNote = !Number.isNaN(itineraryId) && (id === undefined || !Number.isNaN(id))
  const show404 = !showNote

  return (
    <>
      <Navigation />
      { showNote &&
        <Note itineraryId={ itineraryId } id={ id } />
      }
      { show404 &&
        <ErrorMessage text="Pagina niet gevonden" />
      }
    </>
  )
}

export default NotePage
