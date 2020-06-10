import React, { FC } from "react"
import { ScaffoldForm } from "amsterdam-react-final-form"
import styled from "styled-components"
import navigateTo, { navigateToHome } from "../../lib/navigateTo"
import useGlobalActions from "../../hooks/useGlobalActions"
import currentTime from "../../lib/utils/currentTime"
import { generateNotesFormDefinition } from "./notesFormDefinition"
import Scaffold from "../form/Scaffold"

type Props = {
  itineraryItemId: Id
  id?: Id
  value: string
}

const H4 = styled.h4`
  margin-bottom: 8px;
`

type FormValues = {
  text: string
}

const NAW_TEXT = "Niet aanwezig"

const NoteForm: FC<Props> = ({ itineraryItemId, id, value }) => {
  const {
    itinerariesActions: {
      setNote
    },
    getItineraryFromItineraryItem
  } = useGlobalActions()

  const saveNote = async (text: string) => {
    const result = await setNote(itineraryItemId, text, id)
    if (!result) return

    const itinerary = getItineraryFromItineraryItem(itineraryItemId)
    if (itinerary !== undefined) return navigateTo(`itineraries/${ itinerary.id }`)

    return navigateToHome()
  }

  const onSubmit = ({ text }: FormValues) => saveNote(text.trim())
  const onClick = () => saveNote(`${ NAW_TEXT } ${ currentTime() } uur`)
  const definition = generateNotesFormDefinition(NAW_TEXT, onClick)

  return (
    <>
      <H4>Mijn notitie</H4>
      <ScaffoldForm onSubmit={onSubmit} initialValues={{ text: value }}>
        <Scaffold {...definition} />
      </ScaffoldForm>
    </>
  )
}
export default NoteForm
