import React from "react"
import { useParams } from "react-router-dom"
import DaySettingsList from "app/features/settings/components/organisms/Days/DaySettingsList"

type Props = {
  teamSettingsId: string
}

const TeamSettingsDaysPage: React.FC = () => {
  const { teamSettingsId } = useParams<Props>()
  return (
    <DaySettingsList teamSettingsId={ teamSettingsId } />
  ) }

export default TeamSettingsDaysPage
