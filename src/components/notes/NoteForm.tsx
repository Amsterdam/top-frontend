import React, { FC, FormEvent, MouseEvent } from "react"
import NoteTextarea from "./NoteTextarea"
import { Button } from "@datapunt/asc-ui"
import styled from "styled-components"
import useOnChangeState from "../../hooks/useOnChangeState"
import { navigateToHome } from "../../lib/navigateTo"
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
  itineraryId: Id
  id?: Id
  value: string
}

const NoteForm: FC<Props> = ({ itineraryId, id, value }) => {

  const {
    itinerariesActions: {
      setNote
    }
  } = useGlobalState()

  const [text, onChangeText] = useOnChangeState(value)
  const showButton = text === ""
  const nawText = "Niet aanwezig"

  const saveNote = async (text: string) => {
    if (text === "" && id === undefined) return
    const result = await setNote(itineraryId, text, id)
    if (result) navigateToHome()
  }

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault()
    const trimmedText = text.trim()
    await saveNote(trimmedText)
  }

  const onClick = async (event: MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()
    const time = currentTime()
    const text = `${ nawText } ${ time } uur`
    await saveNote(text)
  }

  return (
    <form onSubmit={ onSubmit }>
      <NoteTextarea text={ text } onChange={ onChangeText } />
      <ButtonWrap>
        { showButton &&
          <Button variant="secondary" onClick={ onClick }>{ nawText }</Button>
        }
        <Button variant="secondary">Bewaren</Button>
      </ButtonWrap>
    </form>
  )
}
export default NoteForm
