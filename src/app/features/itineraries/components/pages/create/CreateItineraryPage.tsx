import React, { useEffect } from "react"
import { navigate, RouteComponentProps } from "@reach/router"
import { Heading } from "@amsterdam/asc-ui"

import { useItineraries, useTeamSettings } from "app/state/rest"

import Spacing from "app/features/shared/components/atoms/Spacing/Spacing"
import CenteredSpinner from "app/features/shared/components/atoms/CenteredSpinner/CenteredSpinner"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import { useQueryString } from "app/features/shared/hooks/queryString/useQueryString"
import to from "app/features/shared/routing/to"

import ItineraryForm from "app/features/itineraries/components/organisms/ItineraryForm/ItineraryForm"

type Props = {
  teamSettingsId: number
}

const CreateItineraryPage: React.FC<RouteComponentProps<Props>> = ({ teamSettingsId }) => {
  const { data, isBusy } = useItineraries()
  const { hasParameter } = useQueryString()
  const { data: teamSettings } = useTeamSettings(teamSettingsId!)

  const itineraryExistsOrForceCreateAnother = data && data?.itineraries?.length > 0 && !hasParameter("force")

  useEffect(() => {
    if (itineraryExistsOrForceCreateAnother) {
      navigate(to("/lijst/:itineraryId/", { itineraryId: data?.itineraries[0].id.toString() }))
    }
  }, [ itineraryExistsOrForceCreateAnother, data ])

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
        : !itineraryExistsOrForceCreateAnother ? <ItineraryForm teamSettings={ teamSettings } /> : null
      }
    </DefaultLayout>
  )
}

export default CreateItineraryPage
