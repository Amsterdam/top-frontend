import React, { FC } from "react"
import styled from "styled-components"
import { color } from "@datapunt/asc-ui"
import authUser from "../../../lib/authUser"

type Props = {
  notes: Notes
}

const Div = styled.div`
  margin-top: 8px
`

const P = styled.p`
  margin: 0
  color: ${ color("tint", "level4") }
`

const maxLength = 48
const capNote = (text: string) =>
  text.length > maxLength ? `${ text.substring(0, maxLength).trim() }…` : text

const Notes: FC<Props> = ({ notes }) => (
  <Div>
  { notes.map(({ id, text, author, author: { full_name: fullName } }) =>
    <P key={ id }><span className="anonymous">{ authUser.isAuthUser(author) ? "Ik" : fullName }</span>: { capNote(text) }</P>)
  }
  </Div>
)
export default Notes
