import React, { useEffect } from "react"
import { useItineraries } from "app/state/rest"
import { useRedirectToCorrectItineraryPage } from "app/features/itineraries/utils/useRedirectToCorrectItineraryPage"

const HomePage: React.FC = () => {
  const { data } = useItineraries()
  const { redirectToCorrectItineraryPage } = useRedirectToCorrectItineraryPage()

  useEffect(() => {
    redirectToCorrectItineraryPage(data?.itineraries)
  }, [ data ])

  return null
}

export default HomePage
