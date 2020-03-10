import React, { FC } from "react"
import { Spinner } from "@datapunt/asc-ui"
import ErrorMessage from "../global/ErrorMessage"
import Generate from "./Generate"
import Itineraries from "./Itineraries"
import useGlobalState from "../../hooks/useGlobalState"

const ItinerariesMain: FC = () => {

  const {
    isInitialized,
    itineraries: {
      isFetching,
      itineraries,
      errorMessage
    }
  } = useGlobalState()

  const showSpinner = !isInitialized || isFetching
  const hasError = errorMessage !== undefined
  const showError = hasError
  const hasItineraries = itineraries !== undefined && itineraries.length > 0
  const show = !showSpinner && !showError && hasItineraries
  const showGenerate = !showSpinner && !showError && !hasItineraries

  return (
    <div className="ItinerariesMain">
      { showSpinner &&
        <Spinner size={ 60 } />
      }
      { showError &&
        <ErrorMessage text={ errorMessage! } />
      }
      { showGenerate &&
        <Generate />
      }
      { show &&
        <Itineraries />
      }
    </div>
  )
}
export default ItinerariesMain
