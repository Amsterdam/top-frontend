import React, { FC } from "react"
import { Link, RouteComponentProps } from "@reach/router"
import styled from "styled-components"
import { Heading } from "@amsterdam/asc-ui"

import to from "app/features/shared/routing/to"
import Spacing from "app/features/shared/components/atoms/Spacing/Spacing"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import CenteredSpinner from "../../../../shared/components/atoms/CenteredSpinner/CenteredSpinner"
import DaySettings from "app/features/settings/components/organisms/Days/DaySettings"

const Li = styled.li`
  padding: 0;
`

const Ul = styled.ul`
  padding: 0;
  list-style: none;
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
      <Spacing pb={ 4 }>
        <Link to={ to("/team-settings") }>
          Alle instellingen
        </Link>
      </Spacing>
      <p>Wijzig instellingen voor:</p>
      <Heading>{ teamSettings.name }</Heading>
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
