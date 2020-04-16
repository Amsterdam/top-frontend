import React, { FC, ChangeEvent } from "react"
import { Input } from "@datapunt/asc-ui"
import styled from "styled-components"

type Props = {
  value: string
  onChange: (a: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

// @TODO: Check why ASC Input does not allow forwardedAs
const StyledInput = styled(Input)``

const NoteTextarea: FC<Props> = ({ value, onChange }) =>
  <StyledInput
    forwardedAs="textarea"
    rows={ 10 }
    value={ value }
    onChange={ onChange }
    maxLength={ 1024 }
    autoFocus
    />
export default NoteTextarea
