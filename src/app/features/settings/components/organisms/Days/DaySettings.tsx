import React, { FC } from "react"
import { navigate, RouteComponentProps } from "@reach/router"
import { Button, Heading, themeSpacing } from "@amsterdam/asc-ui"
import styled from "styled-components"

import to from "app/features/shared/routing/to"
import { useDaySettings } from "app/state/rest"

import CenteredSpinner from "../../../../shared/components/atoms/CenteredSpinner/CenteredSpinner"

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-content: baseline;
  padding: ${ themeSpacing(2) } 0;
`

const Body = styled.div`
  display: flex;
  padding-bottom: ${ themeSpacing(4) };
`

const Column = styled.div`
  flex: 1;
  padding-right: ${ themeSpacing(4) };
`

const Dl = styled.dl`
  margin-bottom: ${ themeSpacing(3) };
`

const Dt = styled.dt`
  font-weight: 700;
  margin-bottom: ${ themeSpacing(1) };
`

const Dd = styled.dd`
  margin: 0;
`

const Ul = styled.ul`
  padding: 0 0 0 ${ themeSpacing(5) };
`

const Li = styled.li`
  padding: 0 0 ${ themeSpacing(1) };
`

type Props = {
  teamSettings: Components.Schemas.TeamSettings
  postCodeRangesPresets: Components.Schemas.PostalCodeRangePreset[]
  daySettingsId: number
}

const DaySettings: FC<RouteComponentProps<Props>> = ({ teamSettings, postCodeRangesPresets, daySettingsId }) => {
  const { data: daySettings, isBusy } = useDaySettings(daySettingsId!)
  const postCodeRangesPresetsDict = postCodeRangesPresets?.reduce((t: any, c) => {
    t[c.id] = c.name
    return t
  }, {}) ?? {}
  const postal_code_ranges = daySettings?.postal_code_ranges && daySettings?.postal_code_ranges.map((pc: any) => (pc.range_start + "–" + pc.range_end)).join(", ")
  const postal_code_ranges_presets = daySettings?.postal_code_ranges_presets && daySettings?.postal_code_ranges_presets.map((pc: any) => postCodeRangesPresetsDict[pc])

  if (!teamSettings || !daySettings || isBusy) {
    return <CenteredSpinner size={ 60 } />
  }

  const toEditForm = to("/team-settings/:teamSettingsId/:daySettingsId", {
    teamSettingsId: teamSettings.id,
    daySettingsId: daySettings?.id
  })

  return (
    <section>
      <Header>
        <Heading forwardedAs="h2">{ daySettings?.name }</Heading>
        <Button variant="secondary" onClick={ () => navigate(toEditForm) }>Wijzig</Button>
      </Header>
      <Body>
        <Column>
          <Dl>
            <Dt>Openingsdatum</Dt>
            <Dd>{ daySettings?.opening_date }</Dd>
          </Dl>
          <Dl>
            <Dt>{ (postal_code_ranges_presets?.length) ? "Stadsdelen" : "Postcodes" }</Dt>
            <Dd>{ (postal_code_ranges_presets?.length) ? postal_code_ranges_presets?.join(", ") : postal_code_ranges }</Dd>
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
              { daySettings?.primary_stadium }
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
    </section>
  )
}

export default DaySettings
