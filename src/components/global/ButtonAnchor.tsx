import React, { ReactNode, FC } from "react"
import { Link } from "@reach/router"
import styled from "styled-components"

type Props = {
  to: string,
  children: ReactNode
}

const StyledLink = styled(Link)`
  white-space: nowrap;
  display: inline-flex;
  -webkit-box-align: center;
  align-items: center;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  line-height: 20px;
  color: rgb(255, 255, 255);
  text-decoration: none;
  color: #004699;
  border: 1px solid #004699;
  padding: 12px 15px;
  transition: color 0.1s ease-in-out 0s, background-color 0.1s ease-in-out 0s;
  svg {
    width: 18px
    height: 18px
    margin-right: 12px
  }
`

const ButtonAnchor: FC<Props> = ({ to, children }) =>
  <StyledLink to={ to }>
    { children }
  </StyledLink>
export default ButtonAnchor
