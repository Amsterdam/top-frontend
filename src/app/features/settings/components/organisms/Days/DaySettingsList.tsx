import React, { FC } from "react"
import { Link, RouteComponentProps } from "@reach/router"
import styled from "styled-components"
import { Heading, Paragraph, themeSpacing } from "@amsterdam/asc-ui"
import { useTeamSettingsReasons, useTeamSettingsScheduleTypes, useTeamSettingsStateTypes, useTeamSettings } from "app/state/rest"
import to from "app/features/shared/routing/to"
import Spacing from "app/features/shared/components/atoms/Spacing/Spacing"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import CenteredSpinner from "app/features/shared/components/atoms/CenteredSpinner/CenteredSpinner"
import DaySettingsCard from "app/features/settings/components/organisms/Days/DaySettingsCard"
import DaySettingsCardV2 from "app/features/settings/components/organisms/Days/DaySettingsCardV2"
import AddDaySettingsButton from "app/features/settings/components/molecules/AddDaySettingsButton/AddDaySettingsButton"

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(512px, 1fr));
  gap: ${ themeSpacing(4) };
`

type Props = {
  teamSettingsId: number
  postCodeRangesPresets: Components.Schemas.PostalCodeRangePreset[]
}

const DaySettingsList: FC<RouteComponentProps<Props>> = ({ teamSettingsId, postCodeRangesPresets }) => {
  const { data: teamSettings, isBusy: isBusySettings } = useTeamSettings(teamSettingsId!)
  const { data: caseReasons } = useTeamSettingsReasons(teamSettingsId!)
  const { data: teamScheduleTypes } = useTeamSettingsScheduleTypes(teamSettingsId!)
  const { data: caseStateTypes } = useTeamSettingsStateTypes(teamSettingsId!)
  if (!teamSettings || isBusySettings ) {
    return <CenteredSpinner explanation="Planning ophalen…" size={ 60 } />
  }

  return (
    <DefaultLayout>
      <Heading>Looplijstinstellingen voor planner</Heading>
      <Heading forwardedAs="h2">{ teamSettings.name }</Heading>
      <Spacing pb={ 8 }>
        <Link to={ to("/team-settings") }>
          Kies een ander team
        </Link>
      </Spacing>
      <Spacing pb={ 8 }>
        <AddDaySettingsButton teamSettingsId={ teamSettingsId! }/>
      </Spacing>
      { teamSettings.day_settings_list.length ?
        <>
          <Paragraph>Momenteel zijn de dagen als volgt ingepland:</Paragraph>
          <Grid>
            { teamSettings.day_settings_list.map(daySettings => teamSettings?.use_zaken_backend
              ? (
                <DaySettingsCardV2
                  key={ daySettings.id }
                  teamSettings={ teamSettings }
                  daySettingsId={ daySettings.id }
                  postCodeRangesPresets={ postCodeRangesPresets }
                  caseReasons={ caseReasons }
                  teamScheduleTypes={ teamScheduleTypes }
                  caseStateTypes={ caseStateTypes }
                />
              )
              : (
                <DaySettingsCard
                  key={ daySettings.id }
                  teamSettings={ teamSettings }
                  daySettingsId={ daySettings.id }
                  postCodeRangesPresets={ postCodeRangesPresets }
                />
              )
            ) }
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
