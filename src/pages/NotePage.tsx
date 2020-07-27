import React, { FC } from "react"
import Navigation from "../components/global/navigation/Navigation"
import { RouteComponentProps } from "@reach/router"
import Notes from "../components/notes/Notes"
import ErrorMessage from "../components/global/ErrorMessage"
import { IsFetchingSpinner } from "../components/atoms/PageSpinner/IsFetchingSpinner"
import WizardModal from "../components/notes/wizard/WizardModal"

type Props = RouteComponentProps & {
  itineraryItemId?: string
  id?: string
}

const NotePage: FC<Props> = ({ itineraryItemId: itineraryItemIdString, id: idString }) => {
  const itineraryItemId = parseInt(itineraryItemIdString!, 10)
  const id = idString !== undefined ? parseInt(idString, 10) : undefined
  const showNote = !Number.isNaN(itineraryItemId) && (id === undefined || !Number.isNaN(id))
  const show404 = !showNote

  return (
    <>
      <WizardModal />
      {/*<Navigation />*/}
      {/*<IsFetchingSpinner>*/}
      {/*  { showNote &&*/}
      {/*    <Notes itineraryItemId={ itineraryItemId } id={ id } />*/}
      {/*  }*/}
      {/*  { show404 &&*/}
      {/*    <ErrorMessage text="Pagina niet gevonden" />*/}
      {/*  }*/}
      {/*</IsFetchingSpinner>*/}
    </>
  )
}

export default NotePage
