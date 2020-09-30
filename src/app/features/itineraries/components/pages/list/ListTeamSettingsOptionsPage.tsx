import React, { useEffect } from "react"
import { RouteComponentProps, navigate, Link } from "@reach/router"

import { useTeamSettingsList } from "app/state/rest"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import to from "app/features/shared/routing/to"

import { useLoggedInUser } from "app/state/rest/custom/useLoggedInUser"

const ListTeamSettingsOptionsPage: React.FC<RouteComponentProps> = () => {
  const { data } = useTeamSettingsList()
  const loggedInUser = useLoggedInUser()
  const shouldRedirect = loggedInUser?.team_settings && loggedInUser?.team_settings.length > 0
  
  useEffect(() => {
    if (shouldRedirect) {
      navigate(to("/lijst/nieuw/"))
    }
  }, [shouldRedirect, loggedInUser])

  return <DefaultLayout>
    { data && data.length > 0 && (
      <>
        <h1>Waar werk je vandaag voor?</h1>
        <ul>
          { data.map(teamSettings => (
            <li key={teamSettings.id}>
              <Link to={to("/lijst/nieuw/:teamSettingsId/", { teamSettingsId: teamSettings.id })}>
                {teamSettings.name}
              </Link>
            </li>
          )) }
        </ul>
      </>
    )}
  </DefaultLayout>
}

export default ListTeamSettingsOptionsPage
