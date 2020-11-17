import React, { FC } from "react"
import { Link, RouteComponentProps } from "@reach/router"
import styled from "styled-components"
import { Heading, themeColor } from "@amsterdam/asc-ui"

import to from "app/features/shared/routing/to"
import Spacing from "app/features/shared/components/atoms/Spacing/Spacing"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import CenteredSpinner from "../../../../shared/components/atoms/CenteredSpinner/CenteredSpinner"
import DaySettings from "app/features/settings/components/organisms/Days/DaySettings"

const Ul = styled.ul`
  padding: 0;
  list-style: none;
  border-top: 1px solid ${ themeColor("tint", "level4") };
`

const Li = styled.li`
  padding: 0;
  border-bottom: 1px solid ${ themeColor("tint", "level4") };
`

type Props = {
  teamSettings: Components.Schemas.TeamSettings
  postCodeRangesPresets: Components.Schemas.PostalCodeRangePreset[]
}

const DaySettingsList: FC<RouteComponentProps<Props>> = ({ teamSettings, postCodeRangesPresets }) => {
  if (!teamSettings || !postCodeRangesPresets) {
    return <CenteredSpinner size={ 60 } />
  }

  return (
    <DefaultLayout>
      <Heading>Plan looplijsten</Heading>
      <Heading forwardedAs="h2">{ teamSettings.name }</Heading>
      <Spacing pb={ 4 }>
        <Link to={ to("/team-settings") }>
          Kies een ander team
        </Link>
      </Spacing>
      <Ul>
        { teamSettings.day_settings_list.map(daySettings => (
          <Li key={ daySettings.id }>
            <DaySettings teamSettings={ teamSettings } daySettingsId={ daySettings.id }
                         postCodeRangesPresets={ postCodeRangesPresets } />
          </Li>
        )) }
      </Ul>
    </DefaultLayout>
  )
}

export default DaySettingsList
