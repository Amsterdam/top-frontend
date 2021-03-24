import React from "react"
import { RouteComponentProps } from "@reach/router"
import { useTeamSettings } from "app/state/rest"
import DaySettingsForm from "app/features/settings/components/organisms/Days/DaySettingsForm"
import DaySettingsFormV2 from "app/features/settings/components/organisms/Days/DaySettingsFormV2"

type Props = {
  teamSettingsId: number
  daySettingsId: number
}

const DaySettingsPage: React.FC<RouteComponentProps<Props>> = ({ teamSettingsId, daySettingsId }) => {
  const { data: teamSettings } = useTeamSettings(teamSettingsId!)

  if (teamSettings?.use_zaken_backend) {
    return <DaySettingsFormV2 teamSettingsId={ teamSettingsId } daySettingsId={ daySettingsId } />
  } else {
    return <DaySettingsForm teamSettingsId={ teamSettingsId } daySettingsId={ daySettingsId } />
  }
}

export default DaySettingsPage
