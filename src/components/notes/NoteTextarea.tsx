import React, { FC, ChangeEvent } from "react"
import { Input } from "@datapunt/asc-ui"
import styled from "styled-components"

type Props = {
  value: string
  onChange: (a: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const StyledInput = styled(Input)`
  display: block
  width: 100%
`

const NoteTextarea: FC<Props> = ({ value, onChange }) =>
  <StyledInput forwardedAs="textarea"
    rows={ 10 }
    value={ value }
    onChange={ onChange }
    maxLength={ 1024 }
    autoFocus
    />
export default NoteTextarea
