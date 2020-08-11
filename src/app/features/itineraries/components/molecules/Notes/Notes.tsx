import React, { FC } from "react"
import styled from "styled-components"
import { themeColor } from "@datapunt/asc-ui"

import { useLoggedInUser } from "app/state/rest/custom/useLoggedInUser"

type Props = {
  notes: Components.Schemas.Note[]
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

const Notes: FC<Props> = ({ notes }) => {
  const loggedInUser = useLoggedInUser()
  return (
    <Div>
      { notes.map(({ id, text, author, author: { full_name: fullName, id: authorId } }) =>
        <P key={ id }><span className="anonymous">{ loggedInUser?.id === authorId ? "Ik" : fullName }</span>: { capNote(text) }</P>)
      }
    </Div>
  )
}
export default Notes
