import React, { FC } from "react"
import styled from "styled-components"
import SearchResult from "./SearchResult"
import EmptySearchResult from "./EmptySearchResult"
import { to } from "../../config/page"
import { color, themeSpacing } from "@datapunt/asc-ui"

export type ActionButtonsComponentProps = { caseId: string }
export type ActionButtonsComponentType = React.ComponentType<ActionButtonsComponentProps>

type Props = {
  results?: SearchResults
  actionButtonsComponent?: ActionButtonsComponentType
  caseTo?: CaseTo
}

const D = 15
const Div = styled.div`
  background: ${ color("tint", "level2") };
  margin: ${ themeSpacing(1) } -${ D }px 0 -${ D }px;
  padding: 0 ${ D }px;
`
const P = styled.p`
  margin-top: 12px;
`

export type CaseTo = (caseId: CaseId) => string
export const defaultCaseTo: CaseTo = (caseId: CaseId) => to(`cases/${ caseId }`)

const SearchResults: FC<Props> = ({ results, actionButtonsComponent, caseTo }) => {
  const showResults = results && results.length > 0
  const showEmpty = results && results.length === 0

  return (
    <Div>
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
              <SearchResult caseTo={caseTo} cases={ data!.cases } actionButtonsComponent={actionButtonsComponent} />
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
    </Div>
  )
}
export default SearchResults
