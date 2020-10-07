import React, { FC } from "react"
import styled from "styled-components"
import { themeColor } from "@amsterdam/asc-ui"

type Props = {
  note: string
}

const Div = styled.div`
  margin-top: 8px;
`

const P = styled.p`
  margin: 0;
  color: ${ themeColor("tint", "level4") };
`

const maxLength = 48
const capNote = (text: string) =>
  text.length > maxLength ? `${ text.substring(0, maxLength).trim() }…` : text

const Notes: FC<Props> = ({ note }) => (
    <Div>
      <P>{ capNote(note) }</P>
    </Div>
  )
export default Notes
