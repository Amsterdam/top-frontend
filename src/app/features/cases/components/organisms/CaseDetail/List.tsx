import React from "react"
import styled from "styled-components"

type Props = {
  items: string[]
}

const Ul = styled.ul`
  margin: 0;
  padding: 0;
`

const Li = styled.li`
  margin: 0 0 8px;
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
