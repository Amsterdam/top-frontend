import React, { FC } from "react"
import styled from "styled-components"
import SearchResultSingle from "./SearchResultSingle"
import SearchResultPlural from "./SearchResultPlural"
import {ActionButtonsComponentType, To} from "./SearchResults"

type Props = {
  cases: SearchResultCases
  actionButtonsComponent?:ActionButtonsComponentType
  to?:To
}

const Div = styled.div`
  padding: 10px 0
  border-bottom: 1px solid #B4B4B4
`

const SearchResult: FC<Props> = ({ cases, actionButtonsComponent, to }) => {
  const showPlural = cases.length > 1
  const caseItem = cases[0]

  return (
    <Div>
      { showPlural ?
        <SearchResultPlural to={to} cases={ cases } actionButtonsComponent={actionButtonsComponent} /> :
        <SearchResultSingle to={to} caseItem={ caseItem! } actionButtonsComponent={actionButtonsComponent} />
      }
    </Div>
  )
}
export default SearchResult
