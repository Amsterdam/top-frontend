import React, { FC, useEffect } from "react"
import Spinner from "../global/Spinner"
import ErrorMessage from "../global/ErrorMessage"
import useGlobalState from "../../hooks/useGlobalState"
import useGlobalActions from "../../hooks/useGlobalActions"
import SearchResults from "../search/SearchResults"
import ItinerarySearchResultButtons from "./itinerary/ItinerarySearchResultButtons"

type Props = {
  id: Id
}

const Suggestions: FC<Props> = ({ id }) => {
  const {
    isInitialized,
    search: {
      isFetching,
      errorMessage,
      suggestions: results
    }
  } = useGlobalState()
  const {
    searchActions: {
      getSuggestions
    }
  } = useGlobalActions()

  useEffect(() => {
    getSuggestions(id)
  }, [getSuggestions, id])

  const showSpinner = !isInitialized || isFetching
  const hasError = errorMessage !== undefined
  const showError = hasError
  const hasResults = results !== undefined && results.length > 0
  const show = !showSpinner && !showError
  const showResults = hasResults
  const showEmpty = !hasResults

  return (
    <div className="Suggestions">
      { showSpinner &&
        <Spinner />
      }
      { showError &&
        <ErrorMessage text={ errorMessage! } />
      }
      { show &&
        <>
          <h1>Voeg een adres toe</h1>
          { showResults &&
            <>
              <p>Adressen rondom de adressen in je lijst:</p>
              <SearchResults results={ results } actionButtonsComponent={ItinerarySearchResultButtons} />
            </>
          }
          { showEmpty &&
            <p>Geen adressen beschikbaar</p>
          }
        </>
      }
    </div>
  )
}
export default Suggestions
