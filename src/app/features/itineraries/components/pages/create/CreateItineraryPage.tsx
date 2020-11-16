import React, { useEffect } from "react"
import { RouteComponentProps } from "@reach/router"
import { Heading } from "@amsterdam/asc-ui"

import { useItineraries, useTeamSettings } from "app/state/rest"

import Spacing from "app/features/shared/components/atoms/Spacing/Spacing"
import CenteredSpinner from "app/features/shared/components/atoms/CenteredSpinner/CenteredSpinner"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import { useQueryString } from "app/features/shared/hooks/queryString/useQueryString"

import ItineraryForm from "app/features/itineraries/components/organisms/ItineraryForm/ItineraryForm"
import { redirectToCorrectItineraryPage } from "app/features/itineraries/utils/redirectToCorrectItineraryPage";

type Props = {
  teamSettingsId: number
}

const CreateItineraryPage: React.FC<RouteComponentProps<Props>> = ({ teamSettingsId }) => {
  const { data, isBusy } = useItineraries()
  const { hasParameter } = useQueryString()
  const { data: teamSettings } = useTeamSettings(teamSettingsId!)

  const redirectToExistingItinerary = data && data?.itineraries?.length > 0 && !hasParameter("force")

  useEffect(() => {
    if (redirectToExistingItinerary) {
      redirectToCorrectItineraryPage(data?.itineraries)
    }
  }, [ redirectToExistingItinerary, data ])

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
        ? <CenteredSpinner size={ 60 } />
        : <ItineraryForm teamSettings={ teamSettings } />
      }
    </DefaultLayout>
  )
}

export default CreateItineraryPage
