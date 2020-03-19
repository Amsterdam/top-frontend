import React, { FC } from "react"
import styled from "styled-components"

type Props = {
  type?: "ISSUE" | "REGULAR"
  text?: string
}

const Span = styled.span`
  display: inline-block
  color: white
  background-color: #004699
  border-radius: 6px
  padding: 2px 8px
  font-weight: bold
  &.signal-issue {
    background-color: #EC0000
  }
`

const Signal: FC<Props> = ({ type = "REGULAR", text }) => {
  const classNames = ["signal", `signal-${ type.toLowerCase() }`].join(" ")
  const body = text || (type === "ISSUE" ? "ISSUE melding" : "melding")
  const trimmedText = text === undefined ? "" : text.trim()
  const hasBody = trimmedText !== ""
  return hasBody ? <Span className={ classNames }>{ body }</Span> : null
}

export default Signal
