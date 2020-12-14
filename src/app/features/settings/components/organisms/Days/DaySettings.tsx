import React, { FC } from "react"
import { navigate, RouteComponentProps } from "@reach/router"
import { Button, Heading, themeColor, themeSpacing } from "@amsterdam/asc-ui"
import styled from "styled-components"

import to from "app/features/shared/routing/to"
import { useDaySettings } from "app/state/rest"

import CenteredSpinner from "../../../../shared/components/atoms/CenteredSpinner/CenteredSpinner"
import formatDate from "app/features/shared/utils/formatDate"

const Section = styled.section`
  background-color: ${ themeColor("tint", "level2") };
  padding: ${ themeSpacing(4) };
`

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-content: baseline;
`

const Body = styled.div`
  display: flex;
`

const Column = styled.div`
  flex: 1;

  &:not(:last-child) {
    padding-right: ${ themeSpacing(4) };
  }
`

const Dl = styled.dl`
  margin: 0;

  &:not(:last-child) {
    margin-bottom: ${ themeSpacing(4) };
  }
`

const Dt = styled.dt`
  margin-bottom: ${ themeSpacing(1) };
  font-weight: 500;
  color: ${ themeColor("tint", "level5") };
`

const Dd = styled.dd`
  margin: 0;
`

const Ul = styled.ul`
  margin: 0;
  padding: 0 0 0 ${ themeSpacing(5) };
`

const Li = styled.li`
  margin: 0;
  padding: 0 0 ${ themeSpacing(1) };
`

type Props = {
  teamSettings: Components.Schemas.TeamSettings
  postCodeRangesPresets: Components.Schemas.PostalCodeRangePreset[]
  daySettingsId: number
}

const DaySettings: FC<RouteComponentProps<Props>> = ({ teamSettings, postCodeRangesPresets, daySettingsId }) => {
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

  return (
    <Section>
      <Header>
        <Heading forwardedAs="h2">{ daySettings?.name }</Heading>
        <Button variant="secondary" onClick={ () => navigate(toEditForm) }>Wijzig</Button>
      </Header>
      <Body>
        <Column>
          <Dl>
            <Dt>Openingsdatum</Dt>
            <Dd>{ daySettings?.opening_date ? formatDate(daySettings.opening_date) : "–" }</Dd>
          </Dl>
          <Dl>
            <Dt>Geef SIA meldingen voorrang</Dt>
            <Dd>{ daySettings?.sia_presedence ? "Ja" : "Nee" }</Dd>
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
            <Dt>Projecten</Dt>
            <Dd>
              { daySettings?.projects.length ?
                <Ul>
                  { daySettings?.projects.map(project => (
                    <Li key={ project }>{ project }</Li>
                  )) }
                </Ul>
                : "–" }
            </Dd>
          </Dl>
        </Column>
        <Column>
          <Dl>
            <Dt>Zo veel mogelijk</Dt>
            <Dd>
              { daySettings?.primary_stadium || "–" }
            </Dd>
          </Dl>
          <Dl>
            <Dt>Aanvullen met</Dt>
            <Dd>
              { daySettings?.secondary_stadia.length ?
                <Ul>
                  { daySettings?.secondary_stadia.map(stadium => (
                    <Li key={ stadium }>{ stadium }</Li>
                  )) }
                </Ul>
                : "–" }
            </Dd>
          </Dl>
          <Dl>
            <Dt>Uitsluiten</Dt>
            <Dd>
              { daySettings?.exclude_stadia.length ?
                <Ul>
                  { daySettings?.exclude_stadia.map(stadium => (
                    <Li key={ stadium }>{ stadium }</Li>
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

export default DaySettings
