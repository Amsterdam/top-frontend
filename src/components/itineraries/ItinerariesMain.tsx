import React, { FC } from "react"
import { Spinner } from "@datapunt/asc-ui"
import ErrorMessage from "../global/ErrorMessage"
import Generate from "./Generate"
import Itinerary from "./Itinerary"
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

  const hasError = errorMessage !== undefined
  const showSpinner = (!isInitialized || isFetching) && !hasError
  const showError = hasError
  const hasItineraries = itineraries !== undefined && itineraries.length > 0
  const showGenerate = !showSpinner && !showError && !hasItineraries
  const show = !showSpinner && !showError && hasItineraries
  const itinerary = itineraries[0]

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
        <Itinerary itinerary={ itinerary } />
      }
    </div>
  )
}
export default ItinerariesMain
