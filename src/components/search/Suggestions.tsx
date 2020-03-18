import React, { FC, useEffect } from "react"
import { Spinner } from "@datapunt/asc-ui"
import ErrorMessage from "../global/ErrorMessage"
import useGlobalState from "../../hooks/useGlobalState"
import SearchResults from "../search/SearchResults"

type Props = {
  id: Id
}

const Suggestions: FC<Props> = ({ id }) => {

  const {
    isInitialized,
    search: {
      isFetching,
      errorMessage,
      results
    },
    searchActions: {
      getSuggestions
    }
  } = useGlobalState()

  useEffect(() => {
    getSuggestions(id)
  }, [id])

  const showSpinner = !isInitialized || isFetching
  const hasError = errorMessage !== undefined
  const showError = hasError
  const hasResults = results !== undefined && results.length > 0
  const show = !showSpinner && !showError && hasResults

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
          <SearchResults results={ results } />
        </>
      }
    </div>
  )
}
export default Suggestions
