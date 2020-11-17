import React, { FC, useCallback, useMemo, useState } from "react"
import { Link, RouteComponentProps } from "@reach/router"
import styled from "styled-components"
import { ScaffoldForm } from "amsterdam-react-final-form"
import { Heading } from "@amsterdam/asc-ui"

import to from "app/features/shared/routing/to"
import { useDaySettings, usePostCodeRanges, useTeamSettings } from "app/state/rest"

import Spacing from "app/features/shared/components/atoms/Spacing/Spacing"
import Scaffold from "app/features/shared/components/form/Scaffold"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"

import { createDefinition } from "./daySettingsFormDefinition"
import FixedSubmitButton from "../SettingsForm/components/FixedSubmitButton"
import CenteredSpinner from "../../../../shared/components/atoms/CenteredSpinner/CenteredSpinner"
import { filterEmptyPostalCodes } from "app/features/settings/utils/filterEmptyPostalCodes";

const Wrap = styled.div`
  margin: 0 8px 100px 8px
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
    try {
      await execPut(values, { skipCacheClear: true, useResponseAsCache: true })
    } catch (error) {
      setErrorMessage(error.response.data.message)
      return error
    }
  }, [ execPut, setErrorMessage ])

  if (!daySettings || isBusyDaySettings || !teamSettings || isBusySettings || !postalCodeRangesPresets || isBusyPostalCodeRangesPresets) {
    return <CenteredSpinner size={ 60 } />
  }

  return <DefaultLayout>
    <Wrap>
      <Spacing pb={ 4 }>
        <Link to={ to("/team-settings/:teamSettingsId", { teamSettingsId }) }>
          Alle dagen
        </Link>
      </Spacing>
      <p>Wijzig instellingen voor:</p>
      <Heading>{ teamSettings.name }</Heading>
      <Heading>{ daySettings.name }</Heading>
      <ScaffoldForm onSubmit={ handleSubmit } initialValues={ {
        settings: {
          ...daySettings,
          postal_code_ranges_presets: (daySettings.postal_code_ranges_presets ?? []).map((pcp: any) => String(pcp))
          //   postal_codes_type: postal_codes_type
        },
        name: teamSettings.name
      } }>
        <Scaffold { ...definition } />
        <FixedSubmitButton errorMessage={ errorMessage } />
      </ScaffoldForm>
    </Wrap>
  </DefaultLayout>
}

export default DaySettingsForm
