import React from "react"
import styled from "styled-components"
import { Link } from "react-router-dom"
import { Heading, Paragraph } from "@amsterdam/asc-ui"

import {
  useTeamSettings,
  useTeamSettingsReasons,
  useTeamSettingsScheduleTypes,
  useTeamSettingsStateTypes,
  useTeamSettingsProjects,
  useTeamSettingsSubjects,
  useTeamSettingsTags,
  useCorporations,
  useDistricts
} from "app/state/rest"

import Spacing from "app/features/shared/components/atoms/Spacing/Spacing"
import CenteredSpinner from "app/features/shared/components/atoms/CenteredSpinner/CenteredSpinner"
import DaySettingsCard from "app/features/settings/components/organisms/Days/DaySettingsCard"
import AddDaySettingsButton from "app/features/settings/components/molecules/AddDaySettingsButton/AddDaySettingsButton"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import { daysOfTheWeek } from "../../../utils/daysOfTheWeek"

const Day = styled.div`
  display: flex;
  gap: 24px;
  position: relative; /* Positioning context for CenteredSpinner */
`

const Left = styled.div`
  flex-basis: 160px;
  padding: 16px 0;
`

const Grid = styled.div`
  flex: auto;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(512px, 1fr));
  gap: 16px;
`

const Hr = styled.hr`
  margin: 16px 0;
  border: 0;
  height: 1px;
  background: #B4B4B4;
`

type Props = {
  teamSettingsId: string
}

const DaySettingsList: React.FC<Props> = ({ teamSettingsId }) => {
  const { data: teamSettings, isBusy: isBusySettings } = useTeamSettings(teamSettingsId!)
  const { data: caseReasons } = useTeamSettingsReasons(teamSettingsId!)
  const { data: teamScheduleTypes } = useTeamSettingsScheduleTypes(teamSettingsId!)
  const { data: caseStateTypes } = useTeamSettingsStateTypes(teamSettingsId!)
  const { data: caseProjects } = useTeamSettingsProjects(teamSettingsId!)
  const { data: caseSubjects } = useTeamSettingsSubjects(teamSettingsId!)
  const { data: caseTags } = useTeamSettingsTags(teamSettingsId!)
  const { data: corporations } = useCorporations()
  const { data: districts, isBusy: isBusyDistricts } = useDistricts()

  if (!teamSettings || isBusySettings || !districts || isBusyDistricts) {
    return <CenteredSpinner explanation="Planning ophalen…" size={ 60 } />
  }

  return (
    <DefaultLayout>
      <Heading>Looplijstinstellingen voor planner</Heading>
      <Heading forwardedAs="h2">{ teamSettings.name }</Heading>
      <Spacing pb={ 8 }>
        <Link to="/team-settings">
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
              { teamSettings.day_settings_list.filter(ds => ds.week_days?.includes(parseInt(dayOfTheWeek[0]))).map(daySettings =>
                  <DaySettingsCard
                    key={ daySettings.id }
                    teamSettings={ teamSettings }
                    daySettingsId={ daySettings.id.toString() }
                    caseReasons={ caseReasons }
                    teamScheduleTypes={ teamScheduleTypes }
                    caseStateTypes={ caseStateTypes }
                    caseProjects={ caseProjects }
                    caseSubjects={ caseSubjects }
                    caseTags={ caseTags }
                    corporations={ corporations }
                    districts={ districts }
                  />
              ) }
            </Grid>
          </Day>
        </React.Fragment>
      ) }
    </DefaultLayout>
  )
}

export default DaySettingsList
