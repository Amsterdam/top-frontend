import React, { ReactNode, FC } from "react"
import { Link } from "@reach/router"
import styled from "styled-components"
import StyledButton from "../styled/Button"

type Props = {
  to: string,
  children?: ReactNode
  // @TODO: Restrict iconLeft type to ASC Assets
  iconLeft?: ReactNode
}

const StyledLink = styled(Link)`
  margin-bottom: 0;
  text-decoration: none;
`

// @TODO: a > button is not valid HTML
const ButtonAnchor: FC<Props> = ({ to, children, iconLeft }) =>
  <StyledLink to={ to }>
    <StyledButton variant="blank" iconLeft={ iconLeft }>
      { children }
    </StyledButton>
  </StyledLink>

export default ButtonAnchor
