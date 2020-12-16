import React from "react"
import { RouteComponentProps } from "@reach/router"
import { useTeamSettings, usePostCodeRanges } from "app/state/rest"
import CenteredSpinner from "app/features/shared/components/atoms/CenteredSpinner/CenteredSpinner"
import DaySettingsList from "app/features/settings/components/organisms/Days/DaySettingsList"

type Props = {
    teamSettingsId: number
}

const TeamSettingsDaysPage: React.FC<RouteComponentProps<Props>> = ({ teamSettingsId }) => {
    const { data: teamSettings, isBusy: isBusySettings } = useTeamSettings(teamSettingsId!)
    const { data: postCodeRangesPresets, isBusy: isBusyPostalCodeRangesPresets } = usePostCodeRanges()
    if (!teamSettings || isBusySettings || !postCodeRangesPresets || isBusyPostalCodeRangesPresets) {
        return <CenteredSpinner explanation="Instellingen ophalen…" size={ 60 } />
      }
    return <DaySettingsList teamSettings={teamSettings} postCodeRangesPresets={postCodeRangesPresets.results} />
}

export default TeamSettingsDaysPage
