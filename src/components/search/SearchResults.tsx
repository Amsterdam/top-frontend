import React, { FC } from "react"
import styled from "styled-components"
import SearchResult from "./SearchResult"
import EmptySearchResult from "./EmptySearchResult"

export type ActionButtonsComponentProps = { caseId: string }
export type ActionButtonsComponentType = React.ComponentType<ActionButtonsComponentProps>

type Props = {
  results?: SearchResults
  actionButtonsComponent?:ActionButtonsComponentType
}

const P = styled.p`
  margin-top: 12px
`

const SearchResults: FC<Props> = ({ results, actionButtonsComponent }) => {

  const showResults = results && results.length > 0
  const showEmpty = results && results.length === 0

  return (
    <div className="SearchResults">
    {
      showResults &&
      results!.map((result, index) => {
        const { success, data, error } = result
        const showSearchResult = success && data !== undefined
        const hasCases = data && data.cases.length > 0
        const showEmptySearchResult = success === false || hasCases === false
        return (
          <div key={ `${ JSON.stringify(result) }_${ index }` }>
            { showSearchResult &&
              <SearchResult cases={ data!.cases } actionButtonsComponent={actionButtonsComponent} />
            }
            { showEmptySearchResult &&
              <EmptySearchResult text={ error } />
            }
          </div>
        )
      })
    }
    { showEmpty &&
      <P>Geen resultaten</P>
    }
    </div>
  )
}
export default SearchResults
