import React from "react"
import styled from "styled-components"
import { themeColor } from "@amsterdam/asc-ui"

type Props = {
  color?: string
}

const StyledTag = styled.span<Props>`
  display: inline-block;
  background-color: ${ (props) => props.color ?? themeColor("primary") };
  border-radius: 6px;
  padding: 4px 8px;
  font-weight: 500;
  color: ${ themeColor("tint", "level1") };
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
`

const Tag: React.FC<Props> = ({ color, children }) => (
  <Column>
    <StyledTag color={ color }>
      { children }
    </StyledTag>
  </Column>
)

export default Tag
