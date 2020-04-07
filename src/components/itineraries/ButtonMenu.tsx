import React, { FC, ReactNode } from "react"
import styled from "styled-components"

type Props = {
  children: ReactNode
}

const Div = styled.div`
  position: absolute
  right: 0
  top: -12px
  z-index: 99999
  width: 220px
  display: flex
  flex-direction: column
  background: white
  padding: 12px
  padding-bottom: 0
  border: 1px solid black;
  button {
    margin-bottom: 12px
  }
`

const ButtonMenu: FC<Props> = ({ children }) => (
    <Div>
      { children }
    </Div>
  )
export default ButtonMenu
