import React from "react"
import { RouteComponentProps } from "@reach/router"
import TeamSettingsForm from "app/features/settings/components/organisms/SettingsForm/TeamSetingsForm"

type Props = {
    teamSettingsId: number
}

const TeamSettingsPage: React.FC<RouteComponentProps<Props>> = ({ teamSettingsId }) => {
  return <TeamSettingsForm teamSettingsId={teamSettingsId} />
}

export default TeamSettingsPage
