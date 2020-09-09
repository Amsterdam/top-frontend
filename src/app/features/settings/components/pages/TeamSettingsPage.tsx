import React, { useEffect } from "react"
import { RouteComponentProps } from "@reach/router"

import { useTeamSettings } from "app/state/rest"

import to from "app/features/shared/routing/to"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import TeamSettingsForm from "app/features/settings/components/organisms/SettingsForm/TeamSetingsForm"

type Props = {
    teamSettingsId: number
}

const TeamSettingsPage: React.FC<RouteComponentProps<Props>> = ({ teamSettingsId }) => {
  return <TeamSettingsForm teamSettingsId={teamSettingsId} />
}

export default TeamSettingsPage
