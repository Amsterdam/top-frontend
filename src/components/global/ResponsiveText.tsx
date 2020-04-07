import React, { FC } from "react"
import styled from "styled-components"
import { mobile, desktop } from "../../responsiveness/mediaQueries"

type Props = {
  text: [string, string]
}

const SpanMobile = styled.span`
  @media ${ desktop } {
    display: none
  }
`
const SpanDesktop = styled.span`
  @media ${ mobile } {
    display: none
  }
`

const ResponsiveText: FC<Props> = ({ text }) => (
    <>
      <SpanMobile>{ text[0] }</SpanMobile>
      <SpanDesktop>{ text[1] }</SpanDesktop>
    </>
  )

export default ResponsiveText
