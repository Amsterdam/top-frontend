import React, { FC, useCallback, useMemo, useState } from "react"
import { Link, navigate, RouteComponentProps } from "@reach/router"
import styled from "styled-components"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"
import { Heading } from "@amsterdam/asc-ui"

import config from "app/config/config"
import to from "app/features/shared/routing/to"

import { useDaySettingsList, usePostCodeRanges, useTeamSettings } from "app/state/rest"
import Spacing from "app/features/shared/components/atoms/Spacing/Spacing"
import Scaffold from "app/features/shared/components/form/Scaffold"

import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"
import { createDefinition } from "./DaySettingsFormDefinition"
import FixedSubmitButton from "../SettingsForm/components/FixedSubmitButton"
import CenteredSpinner from "app/features/shared/components/atoms/CenteredSpinner/CenteredSpinner"
import { filterEmptyPostalCodes } from "app/features/settings/utils/filterEmptyPostalCodes"
import { useQueryStringProp } from "app/features/shared/hooks/queryString/useQueryStringProp"
import { daysOfTheWeek } from "app/features/settings/utils/daysOfTheWeek"
import { fixDateFormat } from "app/features/settings/utils/fixDateFormat"

const Wrap = styled.div`
  margin: 0 8px 100px 8px;
`

type Props = {
  teamSettingsId: number
  daySettingsId: number
}

const CreateDaySettingsForm: FC<RouteComponentProps<Props>> = ({ teamSettingsId, daySettingsId }) => {
  const { data: teamSettings, isBusy: isBusySettings } = useTeamSettings(teamSettingsId!)
  const { execPost } = useDaySettingsList({ lazy: true, apiVersion: "v2" })
  const { data: postalCodeRangesPresets, isBusy: isBusyPostalCodeRangesPresets } = usePostCodeRanges()
  const [ errorMessage, setErrorMessage ] = useState("")
  const dayOfTheWeek = useQueryStringProp("d")

  const definition = useMemo(
    () => createDefinition(teamSettings?.project_choices ?? [], teamSettings?.stadia_choices ?? [], (postalCodeRangesPresets?.results ?? []).reduce((t: any, c) => {
      t[String(c.id)] = c.name
      return t
    }, {}) ?? []),
    [ teamSettings, postalCodeRangesPresets ]
  )

  const handleSubmit = useCallback(async (data: any) => {
    const values = filterEmptyPostalCodes(data.settings)
    setErrorMessage("")
    if (data.postal_codes_type === "postcode") {
      values.postal_code_ranges_presets = []
    }
    values.opening_date = fixDateFormat(values.opening_date)
    try {
      await execPost(values, { skipCacheClear: false, useResponseAsCache: false })
      navigate(to("/team-settings/:teamSettingsId", { teamSettingsId }))
    } catch (error: any) {
      setErrorMessage(error.response.data.message)
      return error
    }
  }, [ execPost, setErrorMessage, teamSettingsId ])

  if (!teamSettings || isBusySettings || !postalCodeRangesPresets || isBusyPostalCodeRangesPresets) {
    return <CenteredSpinner explanation="Instellingen ophalen…" size={ 60 } />
  }

  const initialValues = {
    settings: {
      team_settings: teamSettingsId,
      opening_date: "2019-01-01",
      postal_code_ranges: config.settings.defaultPostalCodeRanges,
      week_days: dayOfTheWeek.exists() ? [ dayOfTheWeek.get() ] : Object.keys(daysOfTheWeek).map(d => d.toString())
    },
    postal_codes_type: "postcode"
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
        <Heading forwardedAs="h2">{ teamSettings.name }</Heading>
        { dayOfTheWeek.exists() && <Heading forwardedAs="h3">{ daysOfTheWeek[Number(dayOfTheWeek.get())] }</Heading> }
        <ScaffoldForm onSubmit={ handleSubmit } initialValues={ initialValues }>
          <Scaffold { ...definition } />
          <FixedSubmitButton errorMessage={ errorMessage } />
        </ScaffoldForm>
      </Wrap>
    </DefaultLayout>
  )
}

export default CreateDaySettingsForm
