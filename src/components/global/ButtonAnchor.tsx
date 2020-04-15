import React, { ReactNode, FC } from "react"
import { Link } from "@reach/router"
import styled from "styled-components"

type Props = {
  to: string,
  children: ReactNode
}

// @TODO: This styling is copied from ASC. Find a better way to apply Button styling.
const StyledLink = styled(Link)`
  white-space: nowrap
  display: inline-flex
  -webkit-box-align: center
  align-items: center
  cursor: pointer
  font-size: 16px
  font-weight: 500
  line-height: 20px
  color: rgb(255, 255, 255);
  text-decoration: none
  color: black
  border: 1px solid black
  padding: 12px 15px
  transition: color 0.1s ease-in-out 0s, background-color 0.1s ease-in-out 0s;
  svg {
    width: 18px
    height: 18px
    margin-right: 12px
  }

  // override global styling
  margin-bottom: 0
`

const ButtonAnchor: FC<Props> = ({ to, children }) =>
  <StyledLink to={ to }>
    { children }
  </StyledLink>
export default ButtonAnchor
