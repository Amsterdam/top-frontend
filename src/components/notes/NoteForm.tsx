import React, { FC, useState } from "react"
import { Button } from "@datapunt/asc-ui"
import styled from "styled-components"
import { Form } from "react-final-form"
import navigateTo, { navigateToHome } from "../../lib/navigateTo"
import useGlobalState from "../../hooks/useGlobalState"
import currentTime from "../../lib/utils/currentTime"
import TextareaField from "../form-components/TextareaField"
import { isRequired } from "../form-components/validators/isRequired"

const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
  button {
    margin-left: 12px;
  }
`

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
  } = useGlobalState()

  // TODO should be handled in the new restReducer
  const [isUpdating, setIsUpdating] = useState(false)

  const saveNote = async (text: string) => {
    setIsUpdating(true)
    const result = await setNote(itineraryItemId, text, id)
    setIsUpdating(false)

    if (!result) return

    const itinerary = getItineraryFromItineraryItem(itineraryItemId)
    if (itinerary !== undefined) return navigateTo(`itineraries/${ itinerary.id }`)

    navigateToHome()
  }

  const onSubmit = ({ text }: FormValues) => saveNote(text.trim())
  const onClick = () => saveNote(`${ NAW_TEXT } ${ currentTime() } uur`)

  return (
    <>
      <H4>Mijn notitie</H4>
      <Form
        onSubmit={onSubmit}
        initialValues={{ text: value }}
        render={({ handleSubmit, values: { text }, hasValidationErrors }) => (
          <form onSubmit={ handleSubmit }>
            <TextareaField 
              name='text'
              rows={ 10 }
              maxLength={ 1024 }
              autoFocus
              validate={isRequired}
            />
            <ButtonWrap>
              { (text === undefined || text === "") &&
                <Button
                  type="button"
                  variant="secondary"
                  onClick={ onClick }
                  disabled={ isUpdating }
                >
                  { NAW_TEXT }
                </Button>
              }
              <Button
                variant="secondary"
                disabled={ hasValidationErrors || isUpdating }>
                Bewaren
              </Button>
            </ButtonWrap>
          </form>
        )}
      />

    </>
  )
}
export default NoteForm
