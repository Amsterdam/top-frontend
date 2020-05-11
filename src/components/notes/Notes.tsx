import React, { FC } from "react"
import useGlobalActions from "../../hooks/useGlobalActions"
import Note from "./Note"
import NoteForm from "./NoteForm"
import authUser from "../../lib/authUser"

type Props = {
  itineraryItemId: Id
  id?: Id
}

const Notes: FC<Props> = ({ itineraryItemId, id }) => {
  const {
    getItineraryNotes
  } = useGlobalActions()

  const notes = getItineraryNotes(itineraryItemId, 1) || []
  const { isAuthUser } = authUser
  const userNotes = notes.filter(({ author }) => author && isAuthUser(author))
  const otherNotes = notes.filter(({ author }) => !author || !isAuthUser(author))
  const noteValue = userNotes[0]?.text || ""

  return (
    <div className="Note">
      { otherNotes.map(note => <Note key={ note.id } note={ note } />) }
      <NoteForm itineraryItemId={ itineraryItemId } id={ id } value={ noteValue } />
    </div>
  )
}
export default Notes
