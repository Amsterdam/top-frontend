import React, { ReactNode, FC } from "react"
import { Link } from "@reach/router"
import styled from "styled-components"
import { Button, color } from "@datapunt/asc-ui"

type Props = {
  to: string,
  children?: ReactNode
  // @TODO: Restrict iconLeft type to ASC Assets
  iconLeft?: ReactNode
}

const StyledLink = styled(Link)`
  margin-bottom: 0
`

const StyledButton = styled(Button)`
  border: solid 1px ${ color("tint", "level6") }
`

// @TODO: a > button is not valid HTML
const ButtonAnchor: FC<Props> = ({ to, children, iconLeft }) =>
  <StyledLink to={ to }>
    <StyledButton variant="blank" iconLeft={ iconLeft }>
      { children }
    </StyledButton>
  </StyledLink>

export default ButtonAnchor
