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

const List: React.FC<Props> = ({ items }) => (<UL>
  { items.map(item => <li key={item}>{ item }</li>) }
</UL>)

export default List
