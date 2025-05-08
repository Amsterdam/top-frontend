import React, { useEffect } from "react"
import { useItineraries } from "app/state/rest"
import { useRedirectToCorrectItineraryPage } from "app/features/itineraries/utils/useRedirectToCorrectItineraryPage"
import CenteredSpinner from "app/features/shared/components/atoms/CenteredSpinner/CenteredSpinner"
import useRedirectFromState from "app/features/shared/routing/useRedirectFromState"

const HomePage: React.FC = () => {
  useRedirectFromState()
  const { data, errors } = useItineraries()
  const { redirectToCorrectItineraryPage } = useRedirectToCorrectItineraryPage()

  useEffect(() => {
    redirectToCorrectItineraryPage(data?.itineraries)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const explanation = errors.length > 0 ? "Sorry, de pagina kan niet worden geladen. Probeer het later opnieuw." : "Even geduld alstublieft…"

  return <CenteredSpinner explanation={ explanation } size={ 60 } />
}

export default HomePage
