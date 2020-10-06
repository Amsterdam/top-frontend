import React, { useEffect } from "react"
import { navigate, RouteComponentProps } from "@reach/router"

import { Heading } from "@datapunt/asc-ui";

import { useItineraries, useTeamSettingsList } from "app/state/rest"
import { useLoggedInUser } from "app/state/rest/custom/useLoggedInUser"
import { useTeamSettings } from "app/state/rest/custom/useTeamSettings"

import Spacing from "app/features/shared/components/atoms/Spacing/Spacing";
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
  let teamSettings = useTeamSettings(teamSettingsId!)
  let { data: teamSettingsList } = useTeamSettingsList()
  const loggedInUser = useLoggedInUser()
  const shouldRedirect = data && data?.itineraries?.length > 0 && !hasParameter("force")

  useEffect(() => {
    if (shouldRedirect) {
      navigate(to("/lijst/:itineraryId/", { itineraryId: data?.itineraries[0].id.toString() }))
    }
  }, [ shouldRedirect, data ])

  if (!teamSettingsList || teamSettingsList.length <= 0) {
    return null
  }

  // @ts-ignore
  if (!teamSettings && loggedInUser?.team_settings.length > 0 && teamSettingsList.length > 0) {
    teamSettingsList = teamSettingsList.filter((cur) =>
      cur.id === loggedInUser?.team_settings[0].id
    )
    teamSettings = teamSettingsList[0]
  }

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
        : !shouldRedirect ? <ItineraryForm teamSettings={ teamSettings } /> : null
      }
    </DefaultLayout>
  )
}

export default CreateItineraryPage
