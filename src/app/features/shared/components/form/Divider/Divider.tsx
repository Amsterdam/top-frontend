import React from "react"
import styled from "styled-components"
import { ComposedField, Dimensions, Responsive } from "@amsterdam/amsterdam-react-final-form"

export type DividerProps = {
  position?: Responsive<Dimensions>
}

const Hr = styled.hr`
  margin: 12px 0 4px;
  border: 0;
  height: 1px;
  background: #B4B4B4;
  width: 100%;
`

const Divider: React.FC<DividerProps> = ({ position }) => (
  <ComposedField position={ position }>
    <Hr />
  </ComposedField>
)

export default Divider
