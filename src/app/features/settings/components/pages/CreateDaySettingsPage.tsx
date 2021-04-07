import React from "react"
import { RouteComponentProps } from "@reach/router"
import { useTeamSettings } from "app/state/rest"
import CreateDaySettingsForm from "app/features/settings/components/organisms/Days/CreateDaySettingsForm"
import CreateDaySettingsFormV2 from "app/features/settings/components/organisms/Days/CreateDaySettingsFormV2"

type Props = {
  teamSettingsId: number
}

const CreateDaySettingsPage: React.FC<RouteComponentProps<Props>> = ({ teamSettingsId }) => {
  const { data: teamSettings } = useTeamSettings(teamSettingsId!)

  if (teamSettings?.use_zaken_backend) {
    return <CreateDaySettingsFormV2 teamSettingsId={ teamSettingsId } />
  } else {
    return <CreateDaySettingsForm teamSettingsId={ teamSettingsId } />
  }
}

export default CreateDaySettingsPage
