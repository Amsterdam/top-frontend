import React, { FC } from "react"
import { navigate, RouteComponentProps } from "@reach/router"
import { Button, Heading } from "@amsterdam/asc-ui"

import to from "app/features/shared/routing/to"
import { useDaySettings } from "app/state/rest"

import CenteredSpinner from "app/features/shared/components/atoms/CenteredSpinner/CenteredSpinner"
import formatDate from "app/features/shared/utils/formatDate"
import ValueList from "../../atoms/ValueList/ValueList"
import { Body, Column, Dd, Dl, Dt, Header, Li, Section, Ul } from "./DaySettingsCardStyles"
import isSubletting from "app/features/settings/utils/isSubletting"
import { District } from "app/features/types"

type Props = {
  teamSettings: Components.Schemas.TeamSettings
  daySettingsId: number
  caseReasons: Components.Schemas.CaseReason[]
  teamScheduleTypes: Components.Schemas.TeamScheduleTypes
  caseStateTypes: Components.Schemas.CaseStateType[]
  caseProjects: Components.Schemas.CaseProject[]
  corporations: Components.Schemas.HousingCorporation[]
  districts: District[]
}

const DaySettingsCard: FC<RouteComponentProps<Props>> = (
  {
    teamSettings,
    daySettingsId,
    caseReasons,
    teamScheduleTypes,
    caseStateTypes,
    caseProjects,
    corporations,
    districts
  }
) => {
  const { data: daySettings, isBusy } = useDaySettings(daySettingsId!)

  if (!teamSettings || !daySettings || isBusy) {
    return <CenteredSpinner explanation="Daginstellingen ophalen…" size={ 60 } />
  }

  const toEditForm = to("/team-settings/:teamSettingsId/:daySettingsId", {
    teamSettingsId: teamSettings.id,
    daySettingsId: daySettings?.id
  })

  const isSublet = isSubletting(teamSettings) // Onderhuur

  return (
    <Section>
      <Header>
        <Heading forwardedAs="h3">{ daySettings?.name }</Heading>
        <Button variant="primaryInverted" onClick={ () => navigate(toEditForm) }>Wijzigen</Button>
      </Header>
      <Body>
        <Column>
          <Dl>
            <Dt>Openingsdatum</Dt>
            <Dd>{ daySettings?.opening_date ? formatDate(daySettings.opening_date) : "–" }</Dd>
          </Dl>
          {isSublet && (
            <>
              <Dl>
                <Dt>Samenlopen met een corporatie</Dt>
                <Dd>{ daySettings?.housing_corporation_combiteam ? "Ja" : "Nee" }</Dd>
              </Dl>
              <ValueList
                labels={ [ "Corporaties", "Corporaties" ] }
                options={ corporations }
                values={ daySettings?.housing_corporations }
              />
            </>
          )}
          <ValueList
            labels={ [ "Openingsreden", "Openingsredenen" ] }
            options={ caseReasons }
            values={ daySettings?.reasons }
          />
          <ValueList
            labels={ [ "Projecten", "Projecten" ] }
            options={ caseProjects }
            values={ daySettings?.project_ids }
          />
          <Dl>
            <Dt>Postcodes</Dt>
            <Dd>
              { daySettings?.postal_code_ranges?.length ?
                <Ul>
                  {
                    daySettings?.postal_code_ranges?.map((range: any, index: number) =>
                      <Li key={ "range-" + index }>{ range.range_start }–{ range.range_end }</Li>
                    )
                  }
                </Ul>
                : "–" }
            </Dd>
          </Dl>
          <ValueList
            labels={ [ "Stadsdeel", "Stadsdelen" ] }
            options={ districts }
            values={ daySettings?.districts }
          />
          <ValueList
            labels={ [ "Dagdeel", "Dagdelen" ] }
            options={ teamScheduleTypes?.day_segments }
            values={ daySettings?.day_segments }
          />
          <ValueList
            labels={ [ "Weekdeel", "Weekdelen" ] }
            options={ teamScheduleTypes?.week_segments }
            values={ daySettings?.week_segments }
          />
          <ValueList
            labels={ [ "Prioriteit", "Prioriteiten" ] }
            options={ teamScheduleTypes?.priorities }
            values={ daySettings?.priorities }
          />
        </Column>
        <Column>
          <ValueList
            labels={ [ "Status", "Statussen" ] }
            options={ caseStateTypes }
            values={ daySettings?.state_types }
          />
          <Dl>
            <Dt>Actief in looplijsten</Dt>
            <Dd>
              { daySettings?.used_today_count } van { daySettings?.max_use_limit || "onbeperkt" }
            </Dd>
          </Dl>
        </Column>
      </Body>
    </Section>
  )
}

export default DaySettingsCard
