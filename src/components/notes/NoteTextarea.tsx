import React, { FC, ChangeEvent } from "react"
import styled from "styled-components"
import TextareaBase from "../styled/Textarea"

type Props = {
  text: string
  onChange: (a: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const Textarea = styled(TextareaBase)`
  display: block
  width: 100%
`

const NoteTextarea: FC<Props> = ({ text, onChange }) => <Textarea rows={ 10 } value={ text } onChange={ onChange } autoFocus />
export default NoteTextarea
