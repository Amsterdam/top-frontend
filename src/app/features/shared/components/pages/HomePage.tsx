import React, { useEffect } from "react"
import { useItineraries } from "app/state/rest"
import { useRedirectToCorrectItineraryPage } from "app/features/itineraries/utils/useRedirectToCorrectItineraryPage"
import CenteredSpinner from "app/features/shared/components/atoms/CenteredSpinner/CenteredSpinner"

const HomePage: React.FC = () => {
  const { data } = useItineraries()
  const { redirectToCorrectItineraryPage } = useRedirectToCorrectItineraryPage()

  useEffect(() => {
    redirectToCorrectItineraryPage(data?.itineraries)
  }, [data, redirectToCorrectItineraryPage])

  return <CenteredSpinner explanation="Even geduld alstublieft…" size={ 60 } />
}

export default HomePage
