import React, { FC, useCallback } from "react"
import { ScaffoldForm } from "amsterdam-react-final-form"
import styled from "styled-components"
import { navigate } from "@reach/router"

import { useItineraryItemNote } from "app/state/rest"
import Scaffold from "app/features/shared/components/form/Scaffold"
import to from "app/features/shared/routing/to"

import { getCurrentTime } from "../NoteWizard/utils/getCurrentTime"
import { generateNotesFormDefinition } from "./formDefinition"

type Props = {
  itineraryItemId: string
  itineraryId: string
  id?: string
}

const H4 = styled.h4`
  margin-bottom: 8px;
`

type FormValues = {
  text: string
}

const NAW_TEXT = "Niet aanwezig"

const NoteForm: FC<Props> = ({ itineraryItemId, itineraryId, id }) => {
  const { data, isBusy, execPost, execPut, execDelete } = useItineraryItemNote(id, { lazy: id === undefined })

  const saveNote = useCallback(async (text: string) => {
    const payload = { itinerary_item: parseInt(itineraryItemId), text }

    if (text === "") {
      await execDelete()
    } else if (id !== undefined) {
      await execPut(payload)
    } else {
      await execPost(payload)
    }

    return navigate(to("/lijst/:itineraryId/", { itineraryId }))
  }, [execPut, execPost, execDelete, id, itineraryId, itineraryItemId])

  const onSubmit = ({ text }: FormValues) => saveNote(text.trim())
  const onClick = () => saveNote(`${ NAW_TEXT } ${ getCurrentTime() } uur`)
  const definition = generateNotesFormDefinition(NAW_TEXT, onClick)

  return (
    <>
      <H4>Mijn notitie</H4>
      <ScaffoldForm
        onSubmit={onSubmit}
        initialValues={{ text: data?.text }}
        showSpinner={isBusy || (data === undefined && id !== undefined)}
        keepDirtyOnReinitialize={true}
      >
        <Scaffold {...definition} />
      </ScaffoldForm>
    </>
  )
}
export default NoteForm
