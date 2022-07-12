import React from "react"
import { RouteComponentProps } from "@reach/router"
import DaySettingsList from "app/features/settings/components/organisms/Days/DaySettingsList"

type Props = {
  teamSettingsId: number
}

const TeamSettingsDaysPage: React.FC<RouteComponentProps<Props>> = ({ teamSettingsId }) => <DaySettingsList teamSettingsId={ teamSettingsId } />

export default TeamSettingsDaysPage
