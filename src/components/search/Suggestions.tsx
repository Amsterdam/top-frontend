import React, { FC, useEffect } from "react"
import Spinner from "../global/Spinner"
import ErrorMessage from "../global/ErrorMessage"
import useGlobalState from "../../hooks/useGlobalState"
import useMakeStable from "../../hooks/useMakeStable"
import SearchResults from "../search/SearchResults"
import H1 from "../styled/H1"
import Hr from "../styled/Hr"
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

  const getSuggestionsStale = useMakeStable(getSuggestions)
  useEffect(() => {
    getSuggestionsStale(id)
  }, [getSuggestionsStale, id])

  const showSpinner = !isInitialized || isFetching
  const hasError = errorMessage !== undefined
  const showError = hasError
  const hasResults = results !== undefined && results.length > 0
  const show = !showSpinner && !showError && hasResults

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
          <p>Addressen rondom de adressen in je lijst:</p>
          <Hr />
          <SearchResults results={ results } actionButtonsComponent={ItinerarySearchResultButtons} />
        </>
      }
    </div>
  )
}
export default Suggestions
