import React, { FC, useCallback, useMemo, useState } from "react"
import { Link, navigate, RouteComponentProps } from "@reach/router"
import styled from "styled-components"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"
import { Heading } from "@amsterdam/asc-ui"

import config from "app/config/config"
import to from "app/features/shared/routing/to"
import {
  useDaySettingsList,
  usePostCodeRanges,
  useTeamSettings,
  useTeamSettingsReasons,
  useTeamSettingsScheduleTypes,
  useTeamSettingsStateTypes
} from "app/state/rest"

import Spacing from "app/features/shared/components/atoms/Spacing/Spacing"
import Scaffold from "app/features/shared/components/form/Scaffold"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"

import { createDefinition } from "./daySettingsFormDefinitionV2"
import FixedSubmitButton from "../SettingsForm/components/FixedSubmitButton"
import CenteredSpinner from "app/features/shared/components/atoms/CenteredSpinner/CenteredSpinner"
import { filterEmptyPostalCodes } from "app/features/settings/utils/filterEmptyPostalCodes"
import { useQueryStringProp } from "app/features/shared/hooks/queryString/useQueryStringProp"
import { daysOfTheWeek } from "app/features/settings/utils/daysOfTheWeek"
import { fixDateFormat } from "app/features/settings/utils/fixDateFormat"

const Wrap = styled.div`
  margin: 0 8px 100px 8px;

  // Awful hack to indent values for Postcodes or Stadsdelen
  div:nth-child(5):nth-last-child(9) {
    padding-left: 32px;
  }
`

type Props = {
  teamSettingsId: number
}

const CreateDaySettingsFormV2: FC<RouteComponentProps<Props>> = ({ teamSettingsId }) => {
  const { data: teamSettings } = useTeamSettings(teamSettingsId!)
  const { execPost } = useDaySettingsList({ lazy: true, apiVersion: "v2" })
  const { data: caseReasons } = useTeamSettingsReasons(teamSettingsId!)
  const { data: teamScheduleTypes } = useTeamSettingsScheduleTypes(teamSettingsId!)
  const { data: caseStateTypes } = useTeamSettingsStateTypes(teamSettingsId!)
  const { data: postalCodeRangesPresets, isBusy: isBusyPostalCodeRangesPresets } = usePostCodeRanges()
  const [ errorMessage, setErrorMessage ] = useState("")
  const dayOfTheWeek = useQueryStringProp("d")

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
    [ teamScheduleTypes, caseReasons, caseStateTypes, postalCodeRangesPresets ]
  )

  const handleSubmit = useCallback(async (data: any) => {
    const values = filterEmptyPostalCodes(data)
    setErrorMessage("")

    if (data.postal_codes_type === "postcode") {
      values.postal_code_ranges_presets = []
    }
    // TODO: Fix safari bug in framework
    values.opening_date = fixDateFormat(values.opening_date)
    try {
      await execPost(values, { skipCacheClear: false, useResponseAsCache: false })
      navigate(to("/team-settings/:teamSettingsId", { teamSettingsId }))
    } catch (error) {
      setErrorMessage(error.response.data.message)
      return error
    }
  }, [ execPost, setErrorMessage, teamSettingsId ])

  if (!postalCodeRangesPresets || isBusyPostalCodeRangesPresets) {
    return <CenteredSpinner explanation="Instellingen ophalen…" size={ 60 } />
  }

  const default_postal_code_range = [
    {
      range_start: config.settings.postalCodeMin,
      range_end: config.settings.postalCodeMax
    }
  ]

  const initialValues = {
    team_settings: teamSettingsId,
    postal_code_ranges: default_postal_code_range,
    postal_codes_type: "postcode",
    week_days: dayOfTheWeek.exists() ? [ dayOfTheWeek.get() ] : Object.keys(daysOfTheWeek).map(d => d.toString())
  }

  return (
    <DefaultLayout>
      <Wrap>
        <Spacing pb={ 4 }>
          <Link to={ to("/team-settings/:teamSettingsId", { teamSettingsId }) }>
            Alle dagen
          </Link>
        </Spacing>
        <Heading>Toevoegen daginstelling</Heading>
        <Heading forwardedAs="h2">{ teamSettings?.name }</Heading>
        { dayOfTheWeek.exists() && <Heading forwardedAs="h3">{ daysOfTheWeek[Number(dayOfTheWeek.get())] }</Heading> }
        <ScaffoldForm onSubmit={ handleSubmit } initialValues={ initialValues }>
          <Scaffold { ...definition } />
          <FixedSubmitButton errorMessage={ errorMessage } />
        </ScaffoldForm>
      </Wrap>
    </DefaultLayout>
  )
}

export default CreateDaySettingsFormV2
