import React, { FC } from "react"
import { navigate, RouteComponentProps } from "@reach/router"
import { themeColor, themeSpacing, Button } from "@amsterdam/asc-ui"
import styled from "styled-components"

import to from "app/features/shared/routing/to"
import { useDaySettings } from "app/state/rest"

import CenteredSpinner from "../../../../shared/components/atoms/CenteredSpinner/CenteredSpinner"

const Li = styled.li`
  padding: 0;
`

const Ul = styled.ul`
  padding: 0 0 0 18px;
`

const Wrap = styled.div`
  padding: ${ themeSpacing(3) } ${ themeSpacing(1) };

  flex:1;
  border-top: 2px solid ${ themeColor("tint", "level3") };
  border-bottom: 2px solid ${ themeColor("tint", "level3") };
`

const Header = styled.div`
  padding: ${ themeSpacing(3) } ${ themeSpacing(1) };
  display: flex;
  flex:1;
  border-bottom: 1px solid ${ themeColor("tint", "level3") };
`
const Content = styled.div`
  padding: ${ themeSpacing(3) } ${ themeSpacing(1) };
  display: flex;
`

const Row = styled.div`
`

const Column = styled.div`
  padding: ${ themeSpacing(3) } ${ themeSpacing(1) };
  flex:1;
`

const Column2x = styled.div`
  padding: ${ themeSpacing(3) } ${ themeSpacing(1) };
  flex:2;
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
  const postal_code_ranges = daySettings?.postal_code_ranges && daySettings?.postal_code_ranges.map((pc: any) => ("van: " + pc.range_start + ", tot: " + pc.range_end)).join(", ")
  const postal_code_ranges_presets = daySettings?.postal_code_ranges_presets && daySettings?.postal_code_ranges_presets.map((pc: any) => postCodeRangesPresetsDict[pc])

  if (!teamSettings || !daySettings || isBusy) {
    return <CenteredSpinner size={ 60 } />
  }

  return <Wrap>
      <Header>
          <h3>{ daySettings?.name }</h3>
          <Button variant="secondary" onClick={() => navigate(to("/team-settings/:teamSettingsId/:daySettingsId", { teamSettingsId: teamSettings.id, daySettingsId: daySettings?.id }))}>Wijzig</Button>
      </Header>
      <Content>
        <Column>
        Openings datum: { daySettings?.opening_date }<br/><br/>
        <strong>Geografische filter:</strong><br/>
        {
          (postal_code_ranges_presets && postal_code_ranges_presets?.length > 0) ? <span>Stadsdelen: { postal_code_ranges_presets?.join(", ") }</span>
          : <span>Postcodes: { postal_code_ranges }<br/></span>
        }
        
        </Column>
      </Content>
      <Content>
          <Column>
            Projecten:
            <Ul>
            { daySettings?.projects.map(project => (
                <Li key={ project }>{ project }</Li>
            ))}
            </Ul>
          </Column>
          <Column2x>
            <Row>
            Primair stadium: { daySettings?.primary_stadium }
            </Row>
            <Content>
                <Column>
                Secundair stadia:
                <Ul>
                { daySettings?.secondary_stadia.map(stadium => (
                    <Li key={ stadium }>{ stadium }</Li>
                    ))}
                </Ul>
                </Column>
                <Column>
                Exclude stadia:
                <Ul>
                { daySettings?.exclude_stadia.map(stadium => (
                    <Li key={ stadium }>{ stadium }</Li>
                    ))}
                </Ul>
                </Column>
            </Content>
          </Column2x>
      </Content>
  </Wrap>
}

export default DaySettings
