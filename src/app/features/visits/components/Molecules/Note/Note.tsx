import React, { FC } from "react"
import { ascDefaultTheme } from "@datapunt/asc-ui"
import styled from "styled-components"

type Props = {
  note: Components.Schemas.Note
}

const H4 = styled.h4`
  margin-bottom: 4px;
`

const P = styled.p`
  background: ${ ascDefaultTheme.colors.tint.level2 };
  padding: 8px;
  margin-bottom: 16px;
`

const Note: FC<Props> = ({ note }) => {
  const {
    author: {
      full_name: fullName
    },
    text
  } = note

  return (
    <div>
      <H4>{ fullName }:</H4>
      <P>{ text }</P>
    </div>
  )
}
export default Note
