import React, { FC, useCallback, useMemo, useState } from "react"
import { Link, RouteComponentProps } from "@reach/router"
import styled from "styled-components"
import { ScaffoldForm } from "amsterdam-react-final-form"
import { Heading } from "@amsterdam/asc-ui"

import to from "app/features/shared/routing/to"
import { useTeamSettings, usePostCodeRanges } from "app/state/rest"

import Spacing from "app/features/shared/components/atoms/Spacing/Spacing"
import Scaffold from "app/features/shared/components/form/Scaffold"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"

import { createDefinition } from "./teamSettingsFormDefinition"
import FixedSubmitButton from "./components/FixedSubmitButton"
import JSONDisplay from "./components/JSONDisplay"
import CenteredSpinner from "../../../../shared/components/atoms/CenteredSpinner/CenteredSpinner"

const Wrap = styled.div`
  margin: 0 8px 100px 8px
`

const filterEmptyPostalCodes = (settings: any) =>
  ({
    ...settings,
    postal_code_ranges: settings.postal_code_ranges?.filter((i: any) => {
      if (i == null || !Object.keys(i).includes("range_end") || !Object.keys(i).includes("range_start"))
      {
        return false
      }
      if (!i.range_end){
        i.range_end = 1109
      }
      if (!i.range_start){
        i.range_start = 1000
      }
      Object.keys(i).filter(x => !["range_start", "range_end"].includes(x)).map(d => delete i[d])
      return true
    }) ?? []
  })

type Props = {
  teamSettingsId: number
}

const TeamSettingsForm: FC<RouteComponentProps<Props>> = ({ teamSettingsId }) => {
  const { data: teamSettings, execPut, isBusy: isBusySettings } = useTeamSettings(teamSettingsId!)
  const { data: postalCodeRangesPresets, isBusy: isBusyPostalCodeRangesPresets } = usePostCodeRanges()
  const [ errorMessage, setErrorMessage ] = useState("")
  const defaultPostalCodeRange = [{ range_start: 1000, range_end: 1109 }]
  
  const definition = useMemo(
    () => createDefinition(teamSettings?.project_choices ?? [], teamSettings?.stadia_choices ?? [], postalCodeRangesPresets?.results.map(p => p.name) ?? []),
    [ teamSettings, postalCodeRangesPresets ]
  )

  const handleSubmit = useCallback(async (teamSettings: any) => {
    const values = filterEmptyPostalCodes(teamSettings.settings)
    setErrorMessage("")
    if (teamSettings.settings.postal_codes_type === "stadsdeel"){
      values.postal_codes = teamSettings.postalCodeRangesPresets?.results.reduce((total: string[], current: any) => {
        if (values.postal_code_ranges_presets.includes(current.name)){
          current.postal_code_ranges_presets.map((pcr: any) => total.push(pcr))
        }
        return total
      }, [])
      values.postal_code_ranges = defaultPostalCodeRange
    } else {
      values.postal_codes = values.postal_code_ranges
      values.postal_code_ranges_presets = []
    }
    try {
      await execPut({
        settings: values,
        name: teamSettings.name
      }, { skipCacheClear: true, useResponseAsCache: true })
    } catch (error) {
      setErrorMessage(error.response.data.message)
      return error
    }
  }, [defaultPostalCodeRange, execPut])


  if (!teamSettings || isBusySettings || !postalCodeRangesPresets || isBusyPostalCodeRangesPresets) {
    return <CenteredSpinner size={ 60 } />
  }
  if (!teamSettings.settings.postal_codes || teamSettings.settings.postal_codes.length <= 0){
    teamSettings.settings.postal_codes = defaultPostalCodeRange
  }
  if (!teamSettings.settings.postal_code_ranges || teamSettings.settings.postal_code_ranges.length <= 0){
    teamSettings.settings.postal_code_ranges = teamSettings.settings.postal_codes
  }

  return <DefaultLayout>
    <Wrap>
      <Spacing pb={ 4 }>
        <Link to={ to("/team-settings") }>
          Alle instellingen
        </Link>
      </Spacing>
      <p>Wijzig instellingen voor:</p>
      <Heading>{ teamSettings.name }</Heading>
      <ScaffoldForm onSubmit={ handleSubmit } initialValues={{ 
          settings: teamSettings.settings,
          name: teamSettings.name,
          postalCodeRangesPresets
        }}>
        <Scaffold { ...definition } />
        <FixedSubmitButton errorMessage={ errorMessage } />
        <JSONDisplay title="Huidige settings (JSON)" />
      </ScaffoldForm>
    </Wrap>
  </DefaultLayout>
}

export default TeamSettingsForm
