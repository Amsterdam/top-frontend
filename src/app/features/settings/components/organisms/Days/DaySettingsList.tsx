import React, { FC } from "react"
import styled from "styled-components"
import { Link, RouteComponentProps } from "@reach/router"
import { Heading, Paragraph, themeColor, themeSpacing } from "@amsterdam/asc-ui"

import {
  useTeamSettings,
  useTeamSettingsReasons,
  useTeamSettingsScheduleTypes,
  useTeamSettingsStateTypes,
  useTeamSettingsProjects,
  useCorporations
} from "app/state/rest"

import to from "app/features/shared/routing/to"
import Spacing from "app/features/shared/components/atoms/Spacing/Spacing"
import CenteredSpinner from "app/features/shared/components/atoms/CenteredSpinner/CenteredSpinner"
import DaySettingsCard from "app/features/settings/components/organisms/Days/DaySettingsCard"
import DaySettingsCardV2 from "app/features/settings/components/organisms/Days/DaySettingsCardV2"
import AddDaySettingsButton from "app/features/settings/components/molecules/AddDaySettingsButton/AddDaySettingsButton"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import { daysOfTheWeek } from "../../../utils/daysOfTheWeek"

const Day = styled.div`
  display: flex;
  gap: ${ themeSpacing(6) };
  position: relative; /* Positioning context for CenteredSpinner */
`

const Left = styled.div`
  flex-basis: 160px;
  padding: ${ themeSpacing(4) } 0;
`

const Grid = styled.div`
  flex: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(512px, 1fr));
  gap: ${ themeSpacing(4) };
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
  const { data: caseProjects } = useTeamSettingsProjects(teamSettingsId!)
  const { data: corporations } = useCorporations()

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

      <Paragraph>Momenteel zijn de dagen als volgt ingepland:</Paragraph>
      { Object.entries(daysOfTheWeek).map((dayOfTheWeek: any[]) =>
        <React.Fragment key={ dayOfTheWeek[0] }>
          <Hr />
          <Day>
            <Left>
              <Heading forwardedAs="h2">{ dayOfTheWeek[1] }</Heading>
              <AddDaySettingsButton
                teamSettingsId={ teamSettingsId! }
                dayOfTheWeekId={ parseInt(dayOfTheWeek[0]) }
              />
            </Left>
            <Grid>
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
                    caseProjects={ caseProjects }
                    corporations={ corporations }
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
          </Day>
        </React.Fragment>
      ) }
    </DefaultLayout>
  )
}

export default DaySettingsList
