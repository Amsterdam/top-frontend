import React from "react"
import { useParams } from "react-router-dom"
import CreateDaySettingsForm from "app/features/settings/components/organisms/Days/CreateDaySettingsForm"

type Props = {
  teamSettingsId: string
}

const CreateDaySettingsPage: React.FC = () => {
  const { teamSettingsId } = useParams<Props>()
  return (
    <CreateDaySettingsForm teamSettingsId={ teamSettingsId } />
  )
}
export default CreateDaySettingsPage
