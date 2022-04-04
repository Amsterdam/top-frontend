import React, { FC, useCallback, useMemo, useState } from "react"
import { Link, navigate, RouteComponentProps } from "@reach/router"
import styled from "styled-components"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"
import { Heading } from "@amsterdam/asc-ui"

import config from "app/config/config"
import to from "app/features/shared/routing/to"
import { useDaySettings, usePostCodeRanges, useTeamSettings } from "app/state/rest"

import Spacing from "app/features/shared/components/atoms/Spacing/Spacing"
import Scaffold from "app/features/shared/components/form/Scaffold"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"

import { createDefinition } from "./DaySettingsFormDefinition"
import DeleteDaySettingsButton from "../../molecules/DeleteDaySettingsButton/DeleteDaySettingsButton"
import FixedSubmitButton from "../SettingsForm/components/FixedSubmitButton"
import CenteredSpinner from "app/features/shared/components/atoms/CenteredSpinner/CenteredSpinner"
import { filterEmptyPostalCodes } from "app/features/settings/utils/filterEmptyPostalCodes"
import { daysOfTheWeek } from "app/features/settings/utils/daysOfTheWeek"
import { fixDateFormat } from "app/features/settings/utils/fixDateFormat"

const Wrap = styled.div`
  margin: 0 8px 100px 8px;
`

type Props = {
  teamSettingsId: number
  daySettingsId: number
}

const DaySettingsForm: FC<RouteComponentProps<Props>> = ({ teamSettingsId, daySettingsId }) => {
  const { data: teamSettings, isBusy: isBusySettings } = useTeamSettings(teamSettingsId!)
  const { data: daySettings, execPut, isBusy: isBusyDaySettings } = useDaySettings(daySettingsId!)
  const { data: postalCodeRangesPresets, isBusy: isBusyPostalCodeRangesPresets } = usePostCodeRanges()
  const [ errorMessage, setErrorMessage ] = useState("")

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
      await execPut(values, { skipCacheClear: false, useResponseAsCache: false })
      navigate(to("/team-settings/:teamSettingsId", { teamSettingsId }))
    } catch (error: any) {
      setErrorMessage(error.response.data.message)
      return error
    }
  }, [ execPut, setErrorMessage, teamSettingsId ])

  if (!daySettings || isBusyDaySettings || !teamSettings || isBusySettings || !postalCodeRangesPresets || isBusyPostalCodeRangesPresets) {
    return <CenteredSpinner explanation="Instellingen ophalen…" size={ 60 } />
  }

  const default_postal_code_range = [
    {
      range_start: config.settings.postalCodeMin,
      range_end: config.settings.postalCodeMax
    }
  ]

  return (
    <DefaultLayout>
      <Wrap>
        <Spacing pb={ 4 }>
          <Link to={ to("/team-settings/:teamSettingsId", { teamSettingsId }) }>
            Alle dagen
          </Link>
        </Spacing>
        <Heading>Wijzigen daginstelling</Heading>
        <Heading forwardedAs="h2">{ daySettings.team_settings.name }</Heading>
        { daySettings.week_days?.length === 1 && (
          <Heading forwardedAs="h3">{ daysOfTheWeek[Number(daySettings.week_days[0])] }</Heading>
        )}
        <ScaffoldForm onSubmit={ handleSubmit } initialValues={ {
          settings: {
            ...daySettings,
            postal_code_ranges_presets: (daySettings.postal_code_ranges_presets ?? []).map((pcp: any) => String(pcp)),
            postal_code_ranges: (daySettings.postal_code_ranges_presets ?? []).length > 0 ? default_postal_code_range : daySettings.postal_code_ranges,
            team_settings: teamSettingsId,
            week_days: daySettings?.week_days?.map((wd: number) => wd.toString())
          },
          postal_codes_type: (daySettings.postal_code_ranges_presets ?? []).length > 0 ? "stadsdeel" : "postcode",
          name: teamSettings.name
        } }>
          <Scaffold { ...definition } />
          <FixedSubmitButton errorMessage={ errorMessage } />
        </ScaffoldForm>
        <Spacing pt={ 4 }>
          <DeleteDaySettingsButton teamSettingsId={ teamSettingsId! } daySettingsId={ daySettingsId! } />
        </Spacing>
      </Wrap>
    </DefaultLayout>
  )
}

export default DaySettingsForm
