import React, { FC } from "react"
import { navigate, RouteComponentProps } from "@reach/router"
import { Button, Heading } from "@amsterdam/asc-ui"

import to from "app/features/shared/routing/to"
import { useDaySettings } from "app/state/rest"

import CenteredSpinner from "app/features/shared/components/atoms/CenteredSpinner/CenteredSpinner"
import formatDate from "app/features/shared/utils/formatDate"
import { Body, Column, Dd, Dl, Dt, Header, Li, Section, Ul } from "./DaySettingsCardStyles"

type Props = {
  teamSettings: Components.Schemas.TeamSettings
  postCodeRangesPresets: Components.Schemas.PostalCodeRangePreset[]
  daySettingsId: number
}

const DaySettingsCardV2: FC<RouteComponentProps<Props>> = ({ teamSettings, postCodeRangesPresets, daySettingsId }) => {
  const { data: daySettings, isBusy } = useDaySettings(daySettingsId!)

  if (!teamSettings || !daySettings || isBusy) {
    return <CenteredSpinner explanation="Instellingen ophalen…" size={ 60 } />
  }

  const postalCodeRangesPresetsDict = postCodeRangesPresets?.reduce((t: any, c) => {
    t[c.id] = c.name
    return t
  }, {}) ?? {}
  const postalCodeRangesPresets: string[] | undefined = daySettings?.postal_code_ranges_presets && daySettings?.postal_code_ranges_presets.map((pc: any) => postalCodeRangesPresetsDict[pc]) // Stadsdelen

  const toEditForm = to("/team-settings/:teamSettingsId/:daySettingsId", {
    teamSettingsId: teamSettings.id,
    daySettingsId: daySettings?.id
  })

  const formatObjects = (list: any[], prop: string) => list.map(item => item[prop]).join(", ")

  const getNameById = (array: any[] | undefined, id: number) => array?.map((item) => (item.id === id) ? item.name : undefined)

  return (
    <Section>
      <Header>
        <Heading forwardedAs="h2">{ daySettings?.name } V2</Heading>
        <Button variant="secondary" onClick={ () => navigate(toEditForm) }>Wijzig</Button>
      </Header>
      <Body>
        <Column>
          <Dl>
            <Dt>Openingsdatum</Dt>
            <Dd>{ daySettings?.opening_date ? formatDate(daySettings.opening_date) : "–" }</Dd>
          </Dl>
          <Dl>
            <Dt>{ daySettings?.reasons?.length === 1 ? "Openingsreden" : "Openingsredenen" }</Dt>
            <Dd>
              { daySettings?.reasons?.length ?
                <Ul>
                  { daySettings?.reasons.map((reason) => (
                    <Li key={ `reason-${ reason }` }>{ getNameById(daySettings?.reason_options, reason) }</Li>
                  )) }
                </Ul>
                : "–" }
            </Dd>
          </Dl>
          <Dl>
            <Dt>{ (postalCodeRangesPresets?.length) ? (postalCodeRangesPresets.length === 1 ? "Stadsdeel" : "Stadsdelen") : "Postcodes" }</Dt>
            <Dd>{ (postalCodeRangesPresets?.length) ? postalCodeRangesPresets.join(", ") :
              <Ul>
                {
                  daySettings?.postal_code_ranges?.map((range: any, index: number) =>
                    <Li key={ "range-" + index }>{ range.range_start }–{ range.range_end }</Li>
                  )
                }
              </Ul>
            }</Dd>
          </Dl>
          <Dl>
            <Dt>{ daySettings?.week_segments?.length === 1 ? "Weekdeel" : "Weekdelen" }</Dt>
            <Dd>
              { daySettings?.week_segments?.length ?
                <Ul>
                  { daySettings?.week_segments.map((week_segment) => (
                    <Li key={ `week_segment-${ week_segment }` }>{ getNameById(daySettings?.team_schedule_options?.week_segments, week_segment) }</Li>
                  )) }
                </Ul>
                : "–" }
            </Dd>
          </Dl>
          <Dl>
            <Dt>{ daySettings?.day_segments?.length === 1 ? "Dagdeel" : "Dagdelen" }</Dt>
            <Dd>
              { daySettings?.day_segments?.length ?
                <Ul>
                  { daySettings?.day_segments.map((day_segment) => (
                    <Li key={ `day_segment-${ day_segment }` }>{ getNameById(daySettings?.team_schedule_options?.day_segments, day_segment) }</Li>
                  )) }
                </Ul>
                : "–" }
            </Dd>
          </Dl>
        </Column>
        <Column>
          <Dl>
            <Dt>{ daySettings?.state_types?.length === 1 ? "Status" : "Statussen" }</Dt>
            <Dd>
              { daySettings?.state_types?.length ?
                <Ul>
                  { daySettings?.state_types.map((state_type) => (
                    <Li key={ `state_type-${ state_type }` }>{ getNameById(daySettings?.state_type_options, state_type) }</Li>
                  )) }
                </Ul>
                : "–" }
            </Dd>
          </Dl>
          <Dl>
            <Dt>{ daySettings?.priorities?.length === 1 ? "Prioriteit" : "Prioriteiten" }</Dt>
            <Dd>
              { daySettings?.priorities?.length ?
                <Ul>
                  { daySettings?.priorities.map((priority) => (
                    <Li key={ `priority-${ priority }` }>{ getNameById(daySettings?.team_schedule_options?.priorities, priority) }</Li>
                  )) }
                </Ul>
                : "–" }
            </Dd>
          </Dl>
        </Column>
      </Body>
    </Section>
  )
}

export default DaySettingsCardV2
