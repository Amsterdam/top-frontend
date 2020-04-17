import React, { FC } from "react"
import styled from "styled-components"

type Props = {
  text?: string
}

const Div = styled.div`
  margin-top: 12px;
  border-bottom: 1px solid #767676;
`
const Span = styled.span`
  font-style: italic;
`

const EmptySearchResult: FC<Props> = ({ text = "" }) => (
    <Div>
      <h1>Geen zoekresultaat</h1>
      <p>Voor: <Span>"{ text }"</Span></p>
    </Div>
  )
export default EmptySearchResult
