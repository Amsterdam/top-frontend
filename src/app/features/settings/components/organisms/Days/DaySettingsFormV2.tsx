import React, { FC, useCallback, useMemo, useState } from "react"
import { Link, navigate, RouteComponentProps } from "@reach/router"
import styled from "styled-components"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"
import { Heading } from "@amsterdam/asc-ui"

import to from "app/features/shared/routing/to"
import { useDaySettings, usePostCodeRanges } from "app/state/rest"

import Spacing from "app/features/shared/components/atoms/Spacing/Spacing"
import Scaffold from "app/features/shared/components/form/Scaffold"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"

import { createDefinition } from "./daySettingsFormDefinitionV2"
import FixedSubmitButton from "../SettingsForm/components/FixedSubmitButton"
import CenteredSpinner from "app/features/shared/components/atoms/CenteredSpinner/CenteredSpinner"
import { filterEmptyPostalCodes } from "app/features/settings/utils/filterEmptyPostalCodes"

const Wrap = styled.div`
  margin: 0 8px 100px 8px;

  // Awful hack to indent values for Postcodes or Stadsdelen 
  div:nth-child(5):nth-last-child(9) {
    padding-left: 32px;
  }
`

type Props = {
  teamSettingsId: number
  daySettingsId: number
}

const DaySettingsFormV2: FC<RouteComponentProps<Props>> = ({ teamSettingsId, daySettingsId }) => {
  let { data: daySettings, execPut, isBusy: isBusyDaySettings } = useDaySettings(daySettingsId!)
  const { data: postalCodeRangesPresets, isBusy: isBusyPostalCodeRangesPresets } = usePostCodeRanges()
  const [ errorMessage, setErrorMessage ] = useState("")

  const prepareDefinition = (definitionEntry: any) => definitionEntry?.reduce((t: any, c: any) => {
    t[String(c.id)] = c.name
    return t
  }, {}) || []
  const definition = useMemo(
    () => createDefinition(
        prepareDefinition(postalCodeRangesPresets?.results), 
        prepareDefinition(daySettings?.team_schedule_options?.day_segments), 
        prepareDefinition(daySettings?.team_schedule_options?.week_segments), 
        prepareDefinition(daySettings?.team_schedule_options?.priorities),
        prepareDefinition(daySettings?.reason_options),
        prepareDefinition(daySettings?.state_type_options)
    ),
    [ daySettings, postalCodeRangesPresets ]
  )

  
  const handleSubmit = useCallback(async (data: any) => {
    const values = filterEmptyPostalCodes(data)
    setErrorMessage("")

    if (data.postal_codes_type === "postcode") {
      values.postal_code_ranges_presets = []
    }
    [["enable_day_segments", "day_segments"], ["enable_week_segments", "week_segments"], ["enable_priorities", "priorities"]].map((k: string[]) => {
        if (values[k[0]] === "no") {
            values[k[1]] = []
        }
        return 0
    })
    try {
      await execPut(values, { skipCacheClear: true, useResponseAsCache: true })
      navigate(to("/team-settings/:teamSettingsId", { teamSettingsId }))
    } catch (error) {
      setErrorMessage(error.response.data.message)
      return error
    }
  }, [ execPut, setErrorMessage, teamSettingsId ])

  if (!daySettings || isBusyDaySettings || !postalCodeRangesPresets || isBusyPostalCodeRangesPresets) {
    return <CenteredSpinner explanation="Instellingen ophalen…" size={ 60 } />
  }

  const default_postal_code_range = [
    { range_end: 1109, range_start: 1000 }
  ]

  const prepareInitialValues = (settings: any) => {
    const removeUnknownIds = (seg: any, v: number[] ) => v ? v.filter((n: number, i: number) => seg.map((s: any) => s.id).includes(n) && v?.indexOf(n) === i).map((i: number) => i.toString()) : seg.map((s: any) => s.id).map((i: number) => i.toString())
    return {
        ...settings,
        day_segments: removeUnknownIds(settings.team_schedule_options.day_segments, settings.day_segments),
        week_segments: removeUnknownIds(settings.team_schedule_options.week_segments, settings.week_segments),
        priorities: removeUnknownIds(settings.team_schedule_options.priorities, settings.priorities),
        reasons: removeUnknownIds(settings.reason_options, settings.reasons),
        state_types: removeUnknownIds(settings.state_type_options, settings.state_types),
        postal_code_ranges_presets: (settings.postal_code_ranges_presets ?? []).map((pcp: any) => String(pcp)),
        postal_codes_type: (settings.postal_code_ranges_presets ?? []).length > 0 ? "stadsdeel" : "postcode",
        postal_code_ranges: (settings.postal_code_ranges_presets ?? []).length > 0 ? default_postal_code_range : settings.postal_code_ranges
    }
  }

  return (
    <DefaultLayout>
      <Wrap>
        <Spacing pb={ 4 }>
          <Link to={ to("/team-settings/:teamSettingsId", { teamSettingsId }) }>
            Alle dagen
          </Link>
        </Spacing>
        <p>Wijzig instellingen voor:</p>
        <Heading>{ daySettings.team_settings.name }</Heading>
        <Heading forwardedAs="h2">{ daySettings.name }</Heading>
        <ScaffoldForm onSubmit={ handleSubmit } initialValues={ prepareInitialValues(daySettings) }>
          <Scaffold { ...definition } />
          <FixedSubmitButton errorMessage={ errorMessage } />
        </ScaffoldForm>
      </Wrap>
    </DefaultLayout>
  )
}

export default DaySettingsFormV2
