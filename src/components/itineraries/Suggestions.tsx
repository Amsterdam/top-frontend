import React, { FC } from "react"
import { Spinner } from "@datapunt/asc-ui"
import ErrorMessage from "../global/ErrorMessage"
import useGlobalState from "../../hooks/useGlobalState"
import SearchResult from "../search/SearchResult"

const Suggestions: FC = () => {

  const {
    isInitialized,
    itineraries: {
      isFetching,
      errorMessage,
      suggestions
    }
  } = useGlobalState()

  const showSpinner = !isInitialized || isFetching
  const hasError = errorMessage !== undefined
  const showError = hasError
  const hasSuggestions = suggestions !== undefined && suggestions.length > 0
  const show = !showSpinner && !showError && hasSuggestions

  return (
    <div className="Suggestions">
      { showSpinner &&
        <Spinner size={ 60 } />
      }
      { showError &&
        <ErrorMessage text={ errorMessage! } />
      }
      { show &&
        <>
          <h1>Suggesties</h1>
          { suggestions.map(suggestion => <SearchResult key={ suggestion.case_id } cases={ [suggestion] } />) }
        </>
      }
    </div>
  )
}
export default Suggestions
