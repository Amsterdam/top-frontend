import React from "react"
import { RouteComponentProps } from "@reach/router"
import { usePostCodeRanges } from "app/state/rest"
import CenteredSpinner from "app/features/shared/components/atoms/CenteredSpinner/CenteredSpinner"
import DaySettingsList from "app/features/settings/components/organisms/Days/DaySettingsList"

type Props = {
  teamSettingsId: number
}

const TeamSettingsDaysPage: React.FC<RouteComponentProps<Props>> = ({ teamSettingsId }) => {
  const { data: postCodeRangesPresets, isBusy: isBusyPostalCodeRangesPresets } = usePostCodeRanges()

  if (!postCodeRangesPresets || isBusyPostalCodeRangesPresets) {
    return <CenteredSpinner explanation="Instellingen ophalen…" size={ 60 } />
  }

  return <DaySettingsList teamSettingsId={ teamSettingsId } postCodeRangesPresets={ postCodeRangesPresets.results } />
}

export default TeamSettingsDaysPage
