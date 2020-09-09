import React, { useEffect } from "react"
import { navigate, Link } from "@reach/router"

import { useTeamSettingsList } from "app/state/rest"

import to from "app/features/shared/routing/to"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"


const TeamSettingsListPage: React.FC = () => {
  const { data } = useTeamSettingsList();
  console.log(data?.length);
  return <DefaultLayout>
    { data && data.length > 0 && (
      <>
        <h1>Team intellingen</h1>
        <ul>
          { data.map(teamSettings => (
            <li key={teamSettings.id}>
              <Link to={to("/team-settings/:teamSettingsId", { teamSettingsId: teamSettings.id })}>
                {teamSettings.name}
              </Link>
            </li>
          )) }
        </ul>
      </>
    )}
  </DefaultLayout>
}

export default TeamSettingsListPage
