import React, { FC } from "react"
import styled from "styled-components"

export type Props = {
  text: string
}

const P = styled.p`
  color: #ec0000;
  margin-bottom: 18px;
`

const ErrorMessage: FC<Props> = ({ text }) => (
  <div className="ErrorMessage">
    <P>{ text }</P>
  </div>
)

export default ErrorMessage
