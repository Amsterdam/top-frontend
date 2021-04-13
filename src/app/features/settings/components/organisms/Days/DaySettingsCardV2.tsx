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
  caseReasons: Components.Schemas.CaseReason[]
  teamScheduleTypes: Components.Schemas.TeamScheduleTypes
  caseStateTypes: Components.Schemas.CaseStateType[]
}

const DaySettingsCardV2: FC<RouteComponentProps<Props>> = (
  {
    teamSettings,
    postCodeRangesPresets,
    daySettingsId,
    caseReasons,
    teamScheduleTypes,
    caseStateTypes
  }
) => {
  const { data: daySettings, isBusy } = useDaySettings(daySettingsId!, { apiVersion: "v2" })

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

  const getNameById = (array: any[] | undefined, id: number) => array?.map((item) => (item.id === id) ? item.name : undefined)

  type ValueListProps = {
    labels: string[]
    options?: any[] | null
    values?: any[] | null
  }

  const ValueList: React.FC<ValueListProps> = (({ labels, options, values }) => {
    if (!options) {
      return null
    }

    return (
      <Dl>
        <Dt>{ values?.length === 1 ? labels[0] : labels[1] }</Dt>
        <Dd>
          { values?.length ?
            <Ul>
              { values.map((value) => (
                <Li key={ `labels[0]-${ value }` }>{ getNameById(options, value) }</Li>
              )) }
            </Ul>
            : "–" }
        </Dd>
      </Dl>
    )
  })

  return (
    <Section>
      <Header>
        <Heading forwardedAs="h3">{ daySettings?.name }</Heading>
        <Button variant="primaryInverted" onClick={ () => navigate(toEditForm) }>Wijzig</Button>
      </Header>
      <Body>
        <Column>
          <Dl>
            <Dt>Openingsdatum</Dt>
            <Dd>{ daySettings?.opening_date ? formatDate(daySettings.opening_date) : "–" }</Dd>
          </Dl>
          <ValueList
            labels={ [ "Openingsreden", "Openingsredenen" ] }
            options={ caseReasons }
            values={ daySettings?.reasons }
          />
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
        </Column>
        <Column>
          <ValueList
            labels={ [ "Status", "Statussen" ] }
            options={ caseStateTypes }
            values={ daySettings?.state_types }
          />
          <ValueList
            labels={ [ "Prioriteit", "Prioriteiten" ] }
            options={ teamScheduleTypes?.priorities }
            values={ daySettings?.priorities }
          />
        </Column>
      </Body>
    </Section>
  )
}

export default DaySettingsCardV2
