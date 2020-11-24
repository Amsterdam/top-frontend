import React, { FC } from "react"
import { Link, RouteComponentProps } from "@reach/router"
import styled from "styled-components"
import { Heading, Paragraph, themeSpacing } from "@amsterdam/asc-ui"

import to from "app/features/shared/routing/to"
import Spacing from "app/features/shared/components/atoms/Spacing/Spacing"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import CenteredSpinner from "../../../../shared/components/atoms/CenteredSpinner/CenteredSpinner"
import DaySettings from "app/features/settings/components/organisms/Days/DaySettings"

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(512px, 1fr));
  gap: ${ themeSpacing(4) };
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
      <Spacing pb={ 8 }>
        <Link to={ to("/team-settings") }>
          Kies een ander team
        </Link>
      </Spacing>
      { teamSettings.day_settings_list.length ?
        <>
          <Paragraph>Momenteel zijn de dagen als volgt ingepland:</Paragraph>
          <Grid>
            { teamSettings.day_settings_list.map(daySettings => (
              <DaySettings
                key={ daySettings.id }
                teamSettings={ teamSettings }
                daySettingsId={ daySettings.id }
                postCodeRangesPresets={ postCodeRangesPresets }
              />
            )) }
          </Grid>
        </>
        : (
          <Paragraph>
            Dit team heeft nog geen instellingen. Maak ze aan in de beheeromgeving.
          </Paragraph>
        )
      }
    </DefaultLayout>
  )
}

export default DaySettingsList
