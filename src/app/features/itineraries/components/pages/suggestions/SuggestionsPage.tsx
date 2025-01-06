import React from "react"
import { useParams } from "react-router-dom"
import { Heading } from "@amsterdam/asc-ui"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import CenteredSpinner from "app/features/shared/components/atoms/CenteredSpinner/CenteredSpinner"
import Suggestions from "./Suggestions"
import { useGeoLocation } from "app/features/shared/hooks/useGeoLocation/useGeoLocation" 

type Props = {
  itineraryId: string
}

// const LAT = "52.3706866"
// const LNG = "4.8939469"

const SuggestionsPage: React.FC = () => {
  const { itineraryId } = useParams<Props>()
  const { location, isBusy } = useGeoLocation()
  console.log("BUSY", isBusy)
  console.log("location", location)
  return (
    <DefaultLayout>
      <Heading>Voeg een zaak toe aan je looplijst</Heading>
      { isBusy && <CenteredSpinner explanation="Zaken ophalen…" size={ 60 } /> }
      { itineraryId && !isBusy && (
        <Suggestions 
          itineraryId={ parseInt(itineraryId) }
          lat={ location?.latitude.toString() }
          lng={ location?.longitude.toString() }
        />
      )}
    </DefaultLayout>
  )
}

export default SuggestionsPage
