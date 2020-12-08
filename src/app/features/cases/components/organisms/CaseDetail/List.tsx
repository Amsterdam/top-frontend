import React from "react"
import styled from "styled-components"
import { themeSpacing } from "@amsterdam/asc-ui"

type Props = {
  items: string[]
}

const Ul = styled.ul`
  display: inline-block;
  padding: 0;
  margin: 0 0 ${ themeSpacing(3) } 0;
`

const Li = styled.li`
  list-style: none;
  margin: 0 0 ${ themeSpacing(2) } 0;
`

const List: React.FC<Props> = ({ items }) => (
  <Ul>
    { items.map(item =>
      <Li key={ item }>
        { item }
      </Li>)
    }
  </Ul>
)

export default List
