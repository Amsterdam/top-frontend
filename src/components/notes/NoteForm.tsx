import React, { FC, FormEvent, MouseEvent, useState } from "react"
import NoteTextarea from "./NoteTextarea"
import { Button } from "@datapunt/asc-ui"
import styled from "styled-components"
import useInputState from "../../hooks/useInputState"
import navigateTo, { navigateToHome } from "../../lib/navigateTo"
import useGlobalState from "../../hooks/useGlobalState"
import currentTime from "../../lib/utils/currentTime"

const ButtonWrap = styled.div`
  display: flex
  justify-content: flex-end
  margin-top: 12px
  button {
    margin-left: 12px
  }
`

type Props = {
  itineraryItemId: Id
  id?: Id
  value: string
}

const H4 = styled.h4`
  margin-bottom: 8px
`

const NoteForm: FC<Props> = ({ itineraryItemId, id, value }) => {
  const {
    itinerariesActions: {
      setNote,
    },
    getItineraryFromItineraryItem
  } = useGlobalState()

  const [text, onChangeText] = useInputState(value)
  const showButton = text === ""
  const nawText = "Niet aanwezig"

  const [disabled, setDisabled] = useState(false)

  const saveNote = async (text: string) => {
    if (text === "" && id === undefined) return
    const result = await setNote(itineraryItemId, text, id)
    if (!result) return
    const itinerary = getItineraryFromItineraryItem(itineraryItemId)
    if (itinerary !== undefined) return navigateTo(`itineraries/${ itinerary.id }`)
    navigateToHome()
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    setDisabled(true)
    const trimmedText = text.trim()
    await saveNote(trimmedText)
    setDisabled(false)
  }

  const onClick = async (event: MouseEvent) => {
    setDisabled(true)
    const time = currentTime()
    const text = `${ nawText } ${ time } uur`
    await saveNote(text)
    setDisabled(true)
  }

  return (
    <>
      <H4>Mijn notitie</H4>
      <form onSubmit={ onSubmit }>
        <NoteTextarea value={ text } onChange={ onChangeText } />
        <ButtonWrap>
          { showButton &&
            <Button type="button" variant="secondary" onClick={ onClick } disabled={ disabled }>{ nawText }</Button>
          }
          <Button variant="secondary" disabled={ disabled }>Bewaren</Button>
        </ButtonWrap>
      </form>
    </>
  )
}
export default NoteForm
