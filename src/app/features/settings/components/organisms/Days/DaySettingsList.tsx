import React, { FC } from "react"
import styled from "styled-components"
import { Link, RouteComponentProps } from "@reach/router"
import { Heading, Paragraph, themeColor, themeSpacing } from "@amsterdam/asc-ui"

import {
  useTeamSettings,
  useTeamSettingsReasons,
  useTeamSettingsScheduleTypes,
  useTeamSettingsStateTypes
} from "app/state/rest"

import to from "app/features/shared/routing/to"
import Spacing from "app/features/shared/components/atoms/Spacing/Spacing"
import CenteredSpinner from "app/features/shared/components/atoms/CenteredSpinner/CenteredSpinner"
import DaySettingsCard from "app/features/settings/components/organisms/Days/DaySettingsCard"
import DaySettingsCardV2 from "app/features/settings/components/organisms/Days/DaySettingsCardV2"
import AddDaySettingsButton from "app/features/settings/components/molecules/AddDaySettingsButton/AddDaySettingsButton"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import { daysOfTheWeek } from "../../../utils/daysOfTheWeek"

const Div = styled.div`
  padding: ${ themeSpacing(4) } 0;
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: 160px repeat(auto-fill, minmax(512px, 1fr));
  gap: ${ themeSpacing(4) };
  align-items: baseline;
`

const Hr = styled.hr`
  margin: ${ themeSpacing(4) } 0;
  border: 0;
  height: 1px;
  background: ${ themeColor("tint", "level4") };
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

  if (!teamSettings || isBusySettings) {
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

      { teamSettings.day_settings_list.length ?
        <>
          <Paragraph>Momenteel zijn de dagen als volgt ingepland:</Paragraph>
          { Object.entries(daysOfTheWeek).map((dayOfTheWeek: any[]) =>
            <React.Fragment key={ dayOfTheWeek[0] }>
              <Hr />
              <Grid>
                <Div>
                  <Heading forwardedAs="h2">{ dayOfTheWeek[1] }</Heading>
                  <AddDaySettingsButton
                    teamSettingsId={ teamSettingsId! }
                    dayOfTheWeekId={ parseInt(dayOfTheWeek[0]) }
                  />
                </Div>
                { teamSettings.day_settings_list.filter(ds => ds.week_days?.includes(parseInt(dayOfTheWeek[0]))).map(daySettings => teamSettings?.use_zaken_backend
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
            </React.Fragment>
          ) }
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
