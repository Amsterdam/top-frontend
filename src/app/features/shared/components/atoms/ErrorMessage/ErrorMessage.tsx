import React, { FC } from "react"
import styled from "styled-components"
import { themeColor } from "@amsterdam/asc-ui"

type Props = {
  text: string
}

const P = styled.p`
  color: ${ themeColor("support", "invalid") };
  margin-bottom: 18px;
`

const ErrorMessage: FC<Props> = ({ text }) => (
  <div className="ErrorMessage">
    <P>{ text }</P>
  </div>
)

export default ErrorMessage
