import React, { useEffect } from "react"
import { RouteComponentProps, navigate } from "@reach/router"

import { useItineraries, useTeamSettingsList } from "app/state/rest"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import { useQueryString } from "app/features/shared/hooks/queryString/useQueryString"
import to from "app/features/shared/routing/to"
import CenteredSpinner from "app/features/shared/components/atoms/CenteredSpinner/CenteredSpinner"

import ItineraryForm from "app/features/itineraries/components/organisms/ItineraryForm/ItineraryForm"
import { useLoggedInUser } from "app/state/rest/custom/useLoggedInUser"

const CreateItineraryPage: React.FC<RouteComponentProps> = () => {
  const { data, isBusy } = useItineraries()
  const { hasParameter } = useQueryString()
  let { data: teamSettingsList } = useTeamSettingsList()
  const loggedInUser = useLoggedInUser()
  const shouldRedirect = data && data?.itineraries?.length > 0 && !hasParameter("force")

  useEffect(() => {
    if (shouldRedirect) {
      navigate(to("/lijst/:itineraryId/", { itineraryId: data?.itineraries[0].id.toString() }))
    }
  }, [shouldRedirect, data])

  if (!teamSettingsList || teamSettingsList.length <= 0) {
    return null
  }
  
  // @ts-ignore
  if (loggedInUser?.team_settings.length > 0 && teamSettingsList.length > 0){
    teamSettingsList = teamSettingsList.filter((cur) => 
    cur.id === loggedInUser?.team_settings[0].id
    )
  }

  return <DefaultLayout>
    <h1>{teamSettingsList[0].name}</h1>
    { isBusy
      ? <CenteredSpinner size={60} />
      : !shouldRedirect ? <ItineraryForm teamSettings={teamSettingsList[0]} /> : null
    }
  </DefaultLayout>
}

export default CreateItineraryPage
