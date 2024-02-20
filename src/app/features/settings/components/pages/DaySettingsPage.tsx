import React from "react"
import { useParams } from "react-router-dom"
import DaySettingsForm from "app/features/settings/components/organisms/Days/DaySettingsForm"

type Props = {
  teamSettingsId: string
  daySettingsId: string
}

const DaySettingsPage: React.FC = () => {
  const { teamSettingsId, daySettingsId } = useParams<Props>()
  return (
    <DaySettingsForm teamSettingsId={ teamSettingsId } daySettingsId={ daySettingsId } />
  )
}

export default DaySettingsPage
