import React from "react"
import { useParams } from "react-router-dom"
import { Heading } from "@amsterdam/asc-ui"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import CenteredSpinner from "app/features/shared/components/atoms/CenteredSpinner/CenteredSpinner"
import Suggestions from "./Suggestions"
import { useGeoLocation } from "app/features/shared/hooks/useGeoLocation/useGeoLocation" 

type Params = {
  itineraryId: string
}

const SuggestionsPage: React.FC = () => {
  const { itineraryId } = useParams<Params>()
  const { location, isBusy } = useGeoLocation()

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
