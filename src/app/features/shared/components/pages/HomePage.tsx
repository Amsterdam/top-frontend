import React, { useEffect } from "react"
import { useItineraries } from "app/state/rest/index"
import { redirectToCorrectItineraryPage } from "app/features/itineraries/utils/redirectToCorrectItineraryPage"

const HomePage: React.FC = () => {
  const { data } = useItineraries()

  useEffect(() => {
    redirectToCorrectItineraryPage(data?.itineraries)
  }, [ data ])

  return null
}

export default HomePage
