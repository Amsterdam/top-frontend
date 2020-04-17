import React, { FC, useEffect } from "react"
import Spinner from "../global/Spinner"
import ErrorMessage from "../global/ErrorMessage"
import H1 from "../styled/H1"
import Hr from "../styled/Hr"
import ItinerarySearchResultButtons from "./itinerary/ItinerarySearchResultButtons"
import useGlobalState from "../../hooks/useGlobalState"
import SearchResults from "../search/SearchResults"
import currentDate from "../../lib/utils/currentDate"
import formatDate from "../../lib/utils/formatDate"

const Issues: FC = () => {
  const {
    isInitialized,
    search: {
      isFetching,
      errorMessage,
      issues: results
    },
    searchActions: {
      getIssues
    }
  } = useGlobalState()

  useEffect(() => {
    getIssues()
  }, [getIssues])

  const showSpinner = !isInitialized || isFetching
  const hasError = errorMessage !== undefined
  const showError = hasError
  const hasResults = results !== undefined && results.length > 0
  const show = !showSpinner && !showError && hasResults
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
          <H1>Open issuemeldingen { date }</H1>
          <p>Deze issuemeldingen zijn vandaag nog beschikbaar, voeg ze toe aan je lijst.</p>
          <Hr />
          <SearchResults results={ results } actionButtonsComponent={ItinerarySearchResultButtons} />
        </>
      }
    </div>
  )
}

export default Issues
