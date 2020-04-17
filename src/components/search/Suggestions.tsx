import React, { FC, useEffect } from "react"
import Spinner from "../global/Spinner"
import ErrorMessage from "../global/ErrorMessage"
import useGlobalState from "../../hooks/useGlobalState"
import SearchResults from "../search/SearchResults"
import H1 from "../styled/H1"
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
    },
    searchActions: {
      getSuggestions
    }
  } = useGlobalState()

  useEffect(() => {
    getSuggestions(id)
  }, [getSuggestions, id])

  const showSpinner = !isInitialized || isFetching
  const hasError = errorMessage !== undefined
  const showError = hasError
  const hasResults = results !== undefined && results.length > 0
  const show = !showSpinner && !showError && hasResults
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
          <H1>Voeg een adres toe</H1>
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
