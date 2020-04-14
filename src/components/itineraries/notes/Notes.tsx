import React, { FC } from "react"
import styled from "styled-components"
import authUser from "../../../lib/authUser"

type Props = {
  notes: Notes
}

const Div = styled.div`
  margin: 4px 0
`

const P = styled.p`
  margin-bottom: 0
  font-size: 16px
  line-height: 1.3em
  color: gray
  font-weight: normal
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
