import React, { FC } from "react"
import styled from "styled-components"
import SearchResultSingle from "./SearchResultSingle"
import SearchResultPlural from "./SearchResultPlural"
import {ActionButtonsComponentType, CaseTo} from "./SearchResults"

type Props = {
  cases: SearchResultCases
  actionButtonsComponent?:ActionButtonsComponentType
  caseTo?:CaseTo
}

const Div = styled.div`
  padding: 10px 0;
  border-bottom: 1px solid #B4B4B4;
`

const SearchResult: FC<Props> = ({ cases, actionButtonsComponent, caseTo }) => {
  const showPlural = cases.length > 1
  const caseItem = cases[0]

  return (
    <Div>
      { showPlural ?
        <SearchResultPlural caseTo={caseTo} cases={ cases } actionButtonsComponent={actionButtonsComponent} /> :
        <SearchResultSingle caseTo={caseTo} caseItem={ caseItem! } actionButtonsComponent={actionButtonsComponent} />
      }
    </Div>
  )
}
export default SearchResult
