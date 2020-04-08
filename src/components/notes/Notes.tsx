import React, { FC } from "react"
import useGlobalState from "../../hooks/useGlobalState"
import Spinner from "../global/Spinner"
import Note from "./Note"
import NoteForm from "./NoteForm"
import authUser from "../../lib/authUser"

type Props = {
  itineraryItemId: Id
  id?: Id
}

const Notes: FC<Props> = ({ itineraryItemId, id }) => {
  const {
    itineraries: {
      isFetching
    },
    getItineraryNotes
  } = useGlobalState()

  const notes = getItineraryNotes(itineraryItemId, 1) || []
  const { isAuthUser } = authUser
  const userNotes = notes.filter(({ author }) => author && isAuthUser(author))
  const otherNotes = notes.filter(({ author }) => !author || !isAuthUser(author))
  const noteValue = userNotes[0]?.text || ""

  const showSpinner = isFetching
  const showNoteForm = !isFetching

  return (
    <div className="Note">
      { showSpinner &&
        <Spinner />
      }
      { otherNotes.map(note => <Note key={ note.id } note={ note } />) }
      { showNoteForm &&
        <NoteForm itineraryItemId={ itineraryItemId } id={ id } value={ noteValue } />
      }
    </div>
  )
}
export default Notes
