import React, { FC, ReactNode } from "react"
import styled from "styled-components"
import { themeColor } from "@amsterdam/asc-ui"

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
  background: ${ themeColor("tint", "level1") };
  padding: 12px;
  padding-bottom: 0;
  border: 1px solid ${ themeColor("tint", "level5") };
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
