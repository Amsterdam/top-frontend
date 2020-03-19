import React, { FC } from "react"
import Spinner from "../global/Spinner"
import ErrorMessage from "../global/ErrorMessage"
import Generate from "./Generate"
import ItinerariesIndex from "./ItinerariesIndex"
import Itinerary from "./Itinerary"
import useGlobalState from "../../hooks/useGlobalState"

type Props = {
  id?: Id
  forceGenerate?: boolean
}

const ItinerariesMain: FC<Props> = ({ id, forceGenerate = false }) => {

  const {
    isInitialized,
    itineraries: {
      itineraries,
      errorMessage
    }
  } = useGlobalState()

  const hasError = errorMessage !== undefined
  const showSpinner = !isInitialized && !hasError
  const showError = hasError
  const hasItineraries = itineraries !== undefined && itineraries.length > 0
  const showGenerate = !showSpinner && !showError && (!hasItineraries || forceGenerate)
  const show = !showSpinner && !showError && !showGenerate
  const itinerary = id !== undefined ? itineraries.find(itinerary => itinerary.id === id) : itineraries[0]
  const showItinerary = itinerary !== undefined
  const show404 = !showItinerary
  const itinerariesOther = id !== undefined ? itineraries.filter(itinerary => itinerary.id !== id) : itineraries.slice(1)
  const hasOtherItineraries = itinerariesOther !== undefined && itinerariesOther.length > 0

  return (
    <div>
      { showSpinner &&
        <Spinner />
      }
      { showError &&
        <ErrorMessage text={ errorMessage! } />
      }
      { showGenerate &&
        <Generate />
      }
      { show &&
        <>
          { hasOtherItineraries &&
            <ItinerariesIndex itineraries={ itinerariesOther } />
          }
          { showItinerary &&
            <Itinerary itinerary={ itinerary! } />
          }
          { show404 &&
            <ErrorMessage text="404" />
          }
        </>
      }
    </div>
  )
}
export default ItinerariesMain
