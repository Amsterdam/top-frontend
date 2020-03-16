import React, { FC, useEffect } from "react"
import { Spinner } from "@datapunt/asc-ui"
import ErrorMessage from "../global/ErrorMessage"
import useGlobalState from "../../hooks/useGlobalState"
import SearchResult from "../search/SearchResult"

type Props = {
  id: Id
}

const Suggestions: FC<Props> = ({ id }) => {

  const {
    isInitialized,
    itineraries: {
      isFetching,
      errorMessage,
      suggestions
    },
    itinerariesActions: {
      getSuggestions
    }
  } = useGlobalState()

  useEffect(() => {
    getSuggestions(id)
  }, [id])

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
