import React from "react"
import styled from "styled-components"
import { themeSpacing } from "@datapunt/asc-ui"

type Props = {
  items: string[]
}

const UL = styled.ul`
  display: inline-block;
  padding: 0;
  margin: 0 0 ${ themeSpacing(3) } 0;
`

const LI = styled.li`
  list-style: none;
`

const List: React.FC<Props> = ({ items }) => (<UL>
  { items.map(item => <LI key={item}>{ item }</LI>) }
</UL>)

export default List
