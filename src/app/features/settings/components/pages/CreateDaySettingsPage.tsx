import React from "react"
import { RouteComponentProps } from "@reach/router"
import CreateDaySettingsForm from "app/features/settings/components/organisms/Days/CreateDaySettingsForm"

type Props = {
  teamSettingsId: number
}

const CreateDaySettingsPage: React.FC<RouteComponentProps<Props>> = ({ teamSettingsId }) => <CreateDaySettingsForm teamSettingsId={ teamSettingsId } />

export default CreateDaySettingsPage
