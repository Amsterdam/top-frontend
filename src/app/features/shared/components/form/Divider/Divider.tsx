import React from "react"
import styled from "styled-components"

import { themeColor, themeSpacing } from "@amsterdam/asc-ui"
import { ComposedField, Dimensions, Responsive } from "@amsterdam/amsterdam-react-final-form"

export type DividerProps = {
  name?: string
  position?: Responsive<Dimensions>
}

const Hr = styled.hr`
  margin: ${ themeSpacing(3) } 0 ${ themeSpacing(1) };
  border: 0;
  height: 1px;
  background: ${ themeColor("tint", "level4") };
  width: 100%;
`

const Divider: React.FC<DividerProps> = ({ position }) => (
  <ComposedField position={ position }>
    <Hr />
  </ComposedField>
)

export default Divider
