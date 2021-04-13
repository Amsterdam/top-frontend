import React, { FC, useCallback, useMemo, useState } from "react"
import { Link, navigate, RouteComponentProps } from "@reach/router"
import styled from "styled-components"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"
import { Heading } from "@amsterdam/asc-ui"

import config from "app/config/config"
import to from "app/features/shared/routing/to"
import {
  useDaySettings,
  usePostCodeRanges,
  useTeamSettingsReasons,
  useTeamSettingsScheduleTypes,
  useTeamSettingsStateTypes
} from "app/state/rest"

import Spacing from "app/features/shared/components/atoms/Spacing/Spacing"
import Scaffold from "app/features/shared/components/form/Scaffold"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"

import { createDefinition } from "./daySettingsFormDefinitionV2"
import DeleteDaySettingsButton from "../..//molecules/DeleteDaySettingsButton/DeleteDaySettingsButton"
import FixedSubmitButton from "../SettingsForm/components/FixedSubmitButton"
import CenteredSpinner from "app/features/shared/components/atoms/CenteredSpinner/CenteredSpinner"
import { filterEmptyPostalCodes } from "app/features/settings/utils/filterEmptyPostalCodes"
import { daysOfTheWeek } from "app/features/settings/utils/daysOfTheWeek"

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
  let { data: daySettings, execPut, isBusy: isBusyDaySettings } = useDaySettings(daySettingsId!, { apiVersion: "v2" })
  const { data: postalCodeRangesPresets, isBusy: isBusyPostalCodeRangesPresets } = usePostCodeRanges()
  const { data: caseReasons, isBusy: isBusyCaseReasons } = useTeamSettingsReasons(teamSettingsId!)
  const { data: teamScheduleTypes, isBusy: isBusyTeamScheduleTypes } = useTeamSettingsScheduleTypes(teamSettingsId!)
  const { data: caseStateTypes, isBusy: isBusyCaseStateTypes } = useTeamSettingsStateTypes(teamSettingsId!)
  const [ errorMessage, setErrorMessage ] = useState("")

  const prepareDefinition = (definitionEntry: any) => definitionEntry?.reduce((t: any, c: any) => {
    t[String(c.id)] = c.name
    return t
  }, {}) || []
  const definition = useMemo(
    () => createDefinition(
      prepareDefinition(postalCodeRangesPresets?.results),
      prepareDefinition(teamScheduleTypes?.day_segments),
      prepareDefinition(teamScheduleTypes?.week_segments),
      prepareDefinition(teamScheduleTypes?.priorities),
      prepareDefinition(caseReasons),
      prepareDefinition(caseStateTypes)
    ),
    [ postalCodeRangesPresets, teamScheduleTypes, caseReasons, caseStateTypes ]
  )

  const handleSubmit = useCallback(async (data: any) => {
    const values = filterEmptyPostalCodes(data)
    setErrorMessage("")

    if (data.postal_codes_type === "postcode") {
      values.postal_code_ranges_presets = []
    }
    try {
      await execPut(values, { skipCacheClear: false, useResponseAsCache: false })
      navigate(to("/team-settings/:teamSettingsId", { teamSettingsId }))
    } catch (error) {
      setErrorMessage(error.response.data.message)
      return error
    }
  }, [ execPut, setErrorMessage, teamSettingsId ])

  if (!caseStateTypes || isBusyCaseStateTypes || !caseReasons || isBusyCaseReasons || !teamScheduleTypes || isBusyTeamScheduleTypes || !teamSettingsId || !daySettingsId || !daySettings || isBusyDaySettings || !postalCodeRangesPresets || isBusyPostalCodeRangesPresets) {
    return <CenteredSpinner explanation="Instellingen ophalen…" size={ 60 } />
  }

  const default_postal_code_range = [
    {
      range_start: config.settings.postalCodeMin,
      range_end: config.settings.postalCodeMax
    }
  ]

  const prepareInitialValues = (settings: any) => {
    const removeUnknownIds = (seg: any, v: number[]) => v ? v.filter((n: number, i: number) => seg.map((s: any) => s.id).includes(n) && v?.indexOf(n) === i).map((i: number) => i.toString()) : seg.map((s: any) => s.id).map((i: number) => i.toString())
    return {
      ...settings,
      day_segments: removeUnknownIds(teamScheduleTypes.day_segments, settings.day_segments),
      week_segments: removeUnknownIds(teamScheduleTypes.week_segments, settings.week_segments),
      priorities: removeUnknownIds(teamScheduleTypes.priorities, settings.priorities),
      reasons: removeUnknownIds(caseReasons, settings.reasons),
      state_types: removeUnknownIds(caseStateTypes, settings.state_types),
      postal_code_ranges_presets: (settings.postal_code_ranges_presets ?? []).map((pcp: any) => String(pcp)),
      postal_codes_type: (settings.postal_code_ranges_presets ?? []).length > 0 ? "stadsdeel" : "postcode",
      postal_code_ranges: (settings.postal_code_ranges_presets ?? []).length > 0 ? default_postal_code_range : settings.postal_code_ranges,
      team_settings: teamSettingsId,
      week_days: settings.week_days?.map((wd: number) => wd.toString())
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
        <Heading>{ daySettings.team_settings.name } { daySettings.week_days?.length === 1 ? "op de " + daysOfTheWeek[Number(daySettings.week_days[0])].toLowerCase() : "" }</Heading>
        <Heading forwardedAs="h2">{ daySettings.name }</Heading>
        <ScaffoldForm onSubmit={ handleSubmit } initialValues={ prepareInitialValues(daySettings) }>
          <Scaffold { ...definition } />
          <FixedSubmitButton errorMessage={ errorMessage } />
        </ScaffoldForm>
        <DeleteDaySettingsButton teamSettingsId={ teamSettingsId } daySettingsId={ daySettingsId } />
      </Wrap>
    </DefaultLayout>
  )
}

export default DaySettingsFormV2
