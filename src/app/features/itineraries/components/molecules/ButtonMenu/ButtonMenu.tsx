import React, { FC, ReactNode } from "react"
import styled from "styled-components"

type Props = {
  children: ReactNode
}

const Div = styled.div`
  position: absolute;
  right: 0;
  top: 4px;
  z-index: 99999;
  width: 280px;
  display: flex;
  flex-direction: column;
  background: #FFFFFF;
  padding: 12px;
  padding-bottom: 0;
  border: 1px solid #767676;
  button {
    margin-bottom: 12px;
  }
`

const ButtonMenu: FC<Props> = ({ children }) => (
  <Div>
    { children }
  </Div>
)

export default ButtonMenu
