import React, { MouseEvent, FC } from "react"
import { Button } from "@datapunt/asc-ui"
import styled from "styled-components"
import noop from "../../lib/utils/noop"
import { mobile, desktop } from "../../responsiveness/mediaQueries"

type Props = {
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void
}

const StyledButton = styled(Button)`
  font-weight: bold
  height: auto
  padding: 12px 15px
`

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

const ClearButton: FC<Props> = ({ onClick = noop }) =>
  <StyledButton variant="textButton" onClick={ onClick}>
    <SpanMobile>Wis</SpanMobile>
    <SpanDesktop>Wis velden</SpanDesktop>
  </StyledButton>

export default ClearButton
