import React, { useEffect } from "react"
import { useParams } from "react-router-dom"
import { Heading } from "@amsterdam/asc-ui"
import { useItineraries, useTeamSettings } from "app/state/rest"
import Spacing from "app/features/shared/components/atoms/Spacing/Spacing"
import CenteredSpinner from "app/features/shared/components/atoms/CenteredSpinner/CenteredSpinner"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import { useQueryString } from "app/features/shared/hooks/queryString/useQueryString"
import ItineraryForm from "app/features/itineraries/components/organisms/ItineraryForm/ItineraryForm"
import { useRedirectToCorrectItineraryPage } from "app/features/itineraries/utils/useRedirectToCorrectItineraryPage"

type Props = {
  teamSettingsId: string
}

const CreateItineraryPage: React.FC = () => {
  const { teamSettingsId } = useParams<Props>()
  const { data, isBusy } = useItineraries()
  const { hasParameter } = useQueryString()
  const { data: teamSettings } = useTeamSettings(teamSettingsId!)
  const { redirectToCorrectItineraryPage } = useRedirectToCorrectItineraryPage()

  const redirectToExistingItinerary = data && data?.itineraries?.length > 0 && !hasParameter("force")

  useEffect(() => {
    if (redirectToExistingItinerary) {
      redirectToCorrectItineraryPage(data?.itineraries)
    }
  }, [redirectToExistingItinerary, data, redirectToCorrectItineraryPage])

  if (!teamSettings) {
    return null
  }

  return (
    <DefaultLayout>
      <Spacing pb={ 4 }>
        <Heading>
          Genereer looplijst
        </Heading>
        <Heading forwardedAs="h2">
          { teamSettings.name }
        </Heading>
      </Spacing>
      { isBusy
        ? <CenteredSpinner explanation="We genereren je looplijst…" size={ 60 } />
        : <ItineraryForm teamSettings={ teamSettings } />
      }
    </DefaultLayout>
  )
}

export default CreateItineraryPage
