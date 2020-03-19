import React, { FC } from "react"
import useGlobalState from "../../hooks/useGlobalState"
import Spinner from "../global/Spinner"
import NoteForm from "./NoteForm"

type Props = {
  itineraryId: Id
  id?: Id
}

const Note: FC<Props> = ({ itineraryId, id }) => {

  const {
    itineraries: {
      isFetching
    },
    getItineraryNote
  } = useGlobalState()

  const note = id !== undefined ? getItineraryNote(itineraryId, id) : undefined
  const noteValue = note !== undefined ? note.text : ""
  const showSpinner = isFetching
  const showNoteForm = !isFetching

  return (
    <div className="Note">
      { showSpinner &&
        <Spinner />
      }
      { showNoteForm &&
        <NoteForm itineraryId={ itineraryId } id={ id } value={ noteValue } />
      }
    </div>
  )
}
export default Note
