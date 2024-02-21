import React, { useCallback, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import styled from "styled-components"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"
import { Heading } from "@amsterdam/asc-ui"
import config from "app/config/config"
import to from "app/features/shared/routing/to"
import {
  useDaySettingsList,
  useTeamSettings,
  useTeamSettingsReasons,
  useTeamSettingsScheduleTypes,
  useTeamSettingsStateTypes,
  useTeamSettingsProjects,
  useCorporations,
  useDistricts
} from "app/state/rest"
import useNavigation from "app/features/shared/routing/useNavigation"
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
  teamSettingsId: string
}

const CreateDaySettingsForm: React.FC<Props> = ({ teamSettingsId }) => {
  const { data: teamSettings } = useTeamSettings(teamSettingsId!)
  const { execPost } = useDaySettingsList({ lazy: true })
  const { data: caseReasons } = useTeamSettingsReasons(teamSettingsId!)
  const { data: teamScheduleTypes } = useTeamSettingsScheduleTypes(teamSettingsId!)
  const { data: caseStateTypes } = useTeamSettingsStateTypes(teamSettingsId!)
  const { data: caseProjects } = useTeamSettingsProjects(teamSettingsId!)
  const { data: corporations } = useCorporations()
  const { data: districts, isBusy: isBusyDistricts } = useDistricts()
  const { navigateTo } = useNavigation()
  const [ errorMessage, setErrorMessage ] = useState("")
  const dayOfTheWeek = useQueryStringProp("d")

  const prepareDefinition = (definitionEntry: any) => definitionEntry?.reduce((t: any, c: any) => {
    t[String(c.id)] = c.name
    return t
  }, {}) || []
  const definition = useMemo(
    () => createDefinition(
      prepareDefinition(teamScheduleTypes?.day_segments),
      prepareDefinition(teamScheduleTypes?.week_segments),
      prepareDefinition(teamScheduleTypes?.priorities),
      prepareDefinition(caseReasons),
      prepareDefinition(caseStateTypes),
      prepareDefinition(caseProjects),
      prepareDefinition(corporations),
      prepareDefinition(districts),
      teamSettings
    ),
    [ teamScheduleTypes, caseReasons, caseStateTypes, districts, caseProjects, teamSettings, corporations ]
  )

  const handleSubmit = useCallback(async (data: any) => {
    const values = filterEmptyPostalCodes(data)
    setErrorMessage("")

    if (data.postal_codes_type === "postcode") {
      values.districts = []
    } else if (data.postal_codes_type === "stadsdeel") {
      values.postal_code_ranges = []
    }
    // TODO: Fix safari bug in framework
    values.opening_date = fixDateFormat(values.opening_date)
    try {
      await execPost(values, { skipCacheClear: false, useResponseAsCache: false })
        .then((resp: any) => {
          // Navigate to the update form to show the possible cases for these settings.
          navigateTo("/team-settings/:teamSettingsId/:daySettingsId", { teamSettingsId, daySettingsId: resp.data.id })
        })
    } catch (error: any) {
      setErrorMessage(error.response.data.message)
      return error
    }
  }, [ execPost, setErrorMessage, teamSettingsId ])

  if (!districts || isBusyDistricts) {
    return <CenteredSpinner explanation="Instellingen ophalen…" size={ 60 } />
  }

  const initialValues = {
    team_settings: teamSettingsId,
    opening_date: "2019-01-01",
    postal_code_ranges: config.settings.defaultPostalCodeRanges,
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

export default CreateDaySettingsForm
