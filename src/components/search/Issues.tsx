import React, { FC, useEffect } from "react"
import Spinner from "../global/Spinner"
import ErrorMessage from "../global/ErrorMessage"
import ItinerarySearchResultButtons from "./itinerary/ItinerarySearchResultButtons"
import useGlobalState from "../../hooks/useGlobalState"
import useGlobalActions from "../../hooks/useGlobalActions"
import SearchResults from "../search/SearchResults"
import currentDate from "../../lib/utils/currentDate"
import formatDate from "../../lib/utils/formatDate"

const Issues: FC = () => {
  const {
    isInitialized,
    search: {
      isFetching,
      errorMessage,
      issues: results2
    }
  } = useGlobalState()
  const {
    searchActions: {
      getIssues,
      clear
    }
  } = useGlobalActions()

  useEffect(() => {
    getIssues()
    return () => {
      // Clear onUnMount, to prevent flickering
      clear()
    }
  }, [getIssues, clear])

  const results = results2 !== undefined ? [] : undefined

  const showSpinner = !isInitialized || isFetching
  const hasError = errorMessage !== undefined
  const showError = hasError
  const hasResults = results !== undefined && results.length > 0
  const show = !showSpinner && !showError
  const showResults = hasResults
  const showEmpty = !hasResults
  const date = formatDate(currentDate(), true, false)

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
          <h1>Open issuemeldingen { date }</h1>
          { showResults &&
            <>
              <p>Deze issuemeldingen zijn vandaag nog beschikbaar, voeg ze toe aan je lijst.</p>
              <SearchResults results={ results } actionButtonsComponent={ItinerarySearchResultButtons} />
            </>
          }
          { showEmpty &&
            <p>Geen issuemeldingen beschikbaar</p>
          }
        </>
      }
    </div>
  )
}

export default Issues
