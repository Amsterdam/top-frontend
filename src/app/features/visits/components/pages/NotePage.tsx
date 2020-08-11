import React, { FC, useMemo } from "react"
import { RouteComponentProps } from "@reach/router"

import { useLoggedInUser } from "app/state/rest/custom/useLoggedInUser"
import { useItinerary } from "app/state/rest/custom/useItinerary"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"

import NoteForm from "../organisms/NoteForm/NoteForm"
import Note from "../Molecules/Note/Note"

type Props = RouteComponentProps & {
  noteId?: string
  itineraryId?: string
  itineraryItemId?: string
}

const NotePage: FC<Props> = ({ itineraryId, itineraryItemId, noteId }) => {
  const { data } = useItinerary(itineraryId!)
  const loggedInUser = useLoggedInUser()

  const item = useMemo(() => data?.items?.find(_ =>_.id.toString() === itineraryItemId), [data, itineraryItemId])
  const otherNotes = useMemo(() => item?.notes?.filter(_ => _.author.id !== loggedInUser?.id), [ loggedInUser, item ])

  return (
    <DefaultLayout>
      { otherNotes?.map(note => <Note key={ note.id } note={ note } />) }
      <NoteForm itineraryItemId={itineraryItemId!} id={noteId} itineraryId={itineraryId!} />
    </DefaultLayout>
  )
}

export default NotePage
