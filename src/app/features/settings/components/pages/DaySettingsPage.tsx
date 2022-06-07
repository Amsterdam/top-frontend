import React from "react"
import { RouteComponentProps } from "@reach/router"
import DaySettingsForm from "app/features/settings/components/organisms/Days/DaySettingsForm"

type Props = {
  teamSettingsId: number
  daySettingsId: number
}

const DaySettingsPage: React.FC<RouteComponentProps<Props>> = ({ teamSettingsId, daySettingsId }) => <DaySettingsForm teamSettingsId={ teamSettingsId } daySettingsId={ daySettingsId } />

export default DaySettingsPage
