import React, { FC } from "react"
import styled from "styled-components"

type Props = {
  text: string
}

// @TODO: Use ASC
const P = styled.p`
  color: red
  margin-bottom: 18px
`

const ErrorMessage: FC<Props> = ({ text }) => (
    <div className="ErrorMessage">
      <P>{ text }</P>
    </div>
  )
export default ErrorMessage
