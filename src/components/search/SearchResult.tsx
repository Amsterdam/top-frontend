import React, { FC } from "react"
import styled from "styled-components"
import SearchResultSingle from "./SearchResultSingle"
import SearchResultPlural from "./SearchResultPlural"

type Props = {
  cases: SearchResultCases
}

const Div = styled.div`
  padding: 10px 0
  border-bottom: 1px solid #B4B4B4
`

const SearchResult: FC<Props> = ({ cases }) => {

  const showPlural = cases.length > 1
  const caseItem = cases[0]

  return (
    <Div>
      { showPlural ?
        <SearchResultPlural cases={ cases } /> :
        <SearchResultSingle caseItem={ caseItem! } />
      }
    </Div>
  )
}
export default SearchResult
