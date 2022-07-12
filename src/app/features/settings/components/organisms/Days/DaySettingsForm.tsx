import React, { FC, useCallback, useMemo, useState } from "react"
import { Link, RouteComponentProps } from "@reach/router"
import styled from "styled-components"
import { ScaffoldForm } from "@amsterdam/amsterdam-react-final-form"
import { Heading } from "@amsterdam/asc-ui"
import { navigate } from "@reach/router"

import config from "app/config/config"
import to from "app/features/shared/routing/to"
import {
  useDaySettings,
  useTeamSettingsReasons,
  useTeamSettingsScheduleTypes,
  useTeamSettingsStateTypes,
  useTeamSettingsProjects,
  useCorporations,
  useDistricts
} from "app/state/rest"

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
  let { data: daySettings, execPut, isBusy: isBusyDaySettings } = useDaySettings(daySettingsId!, { caseCount: true })
  const { data: caseReasons, isBusy: isBusyCaseReasons } = useTeamSettingsReasons(teamSettingsId!)
  const { data: teamScheduleTypes, isBusy: isBusyTeamScheduleTypes } = useTeamSettingsScheduleTypes(teamSettingsId!)
  const { data: caseStateTypes, isBusy: isBusyCaseStateTypes } = useTeamSettingsStateTypes(teamSettingsId!)
  const { data: caseProjects, isBusy: isBusyCaseProjects } = useTeamSettingsProjects(teamSettingsId!)
  const { data: corporations, isBusy: isBusyCorporations } = useCorporations()
  const { data: districts, isBusy: isBusyDistricts } = useDistricts()
  const [ errorMessage, setErrorMessage ] = useState("")

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
      daySettings?.team_settings
    ),
    [ districts, teamScheduleTypes, caseReasons, caseStateTypes, caseProjects, daySettings, corporations ]
  )

  const handleSubmit = useCallback(async (data: any) => {
    const values = filterEmptyPostalCodes(data)
    setErrorMessage("")

    if (data.postal_codes_type === "postcode") {
      values.districts = []
    } else if (data.postal_codes_type === "stadsdeel") {
      values.postal_code_ranges = []
    }
    values.opening_date = fixDateFormat(values.opening_date)
    try {
      await execPut(values, { skipCacheClear: false, useResponseAsCache: false })
    } catch (error: any) {
      setErrorMessage(error.response.data.message)
      return error
    }
  }, [ execPut, setErrorMessage ])

  if (!caseProjects || isBusyCaseProjects || !caseStateTypes || isBusyCaseStateTypes || !caseReasons
      || isBusyCaseReasons || !teamScheduleTypes || isBusyTeamScheduleTypes || !teamSettingsId
      || !daySettingsId || !daySettings || isBusyDaySettings || !districts
      || isBusyDistricts || !corporations || isBusyCorporations
    ) {
    return <CenteredSpinner explanation="Instellingen ophalen…" size={ 60 } />
  }

  const onClose = () => {
    navigate(to("/team-settings/:teamSettingsId", { teamSettingsId }))
  }
  // console.log(districts)
  // console.log(corporations)

  const prepareInitialValues = (settings: any) => {
    const removeUnknownIds = (seg: any, v: number[]) => v ? v.filter((n: number, i: number) => seg.map((s: any) => s.id).includes(n) && v?.indexOf(n) === i).map((i: number) => i.toString()) : []
    return {
      ...settings,
      day_segments: removeUnknownIds(teamScheduleTypes.day_segments, settings.day_segments),
      week_segments: removeUnknownIds(teamScheduleTypes.week_segments, settings.week_segments),
      priorities: removeUnknownIds(teamScheduleTypes.priorities, settings.priorities),
      reasons: removeUnknownIds(caseReasons, settings.reasons),
      project_ids: removeUnknownIds(caseProjects, settings.project_ids),
      state_types: removeUnknownIds(caseStateTypes, settings.state_types),
      housing_corporations: removeUnknownIds(corporations, settings.housing_corporations),
      districts: removeUnknownIds(districts, settings.districts),
      postal_codes_type: (settings.districts ?? []).length > 0 ? "stadsdeel" : "postcode",
      postal_code_ranges: (settings.districts ?? []).length > 0 ? config.settings.defaultPostalCodeRanges : settings.postal_code_ranges,
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
        <Heading>Wijzigen daginstelling</Heading>
        <Heading forwardedAs="h2">{ daySettings?.team_settings.name }</Heading>
        { daySettings?.week_days?.length === 1 && (
          <Heading forwardedAs="h3">{ daysOfTheWeek[Number(daySettings?.week_days[0])] }</Heading>
        )}
        <ScaffoldForm onSubmit={ handleSubmit } initialValues={ prepareInitialValues(daySettings) }>
          <Scaffold { ...definition } />
          <FixedSubmitButton onClose={ onClose } errorMessage={ errorMessage } caseCount={ daySettings?.case_count?.count } />
        </ScaffoldForm>
        <Spacing pt={ 4 }>
          <DeleteDaySettingsButton teamSettingsId={ teamSettingsId } daySettingsId={ daySettingsId } />
        </Spacing>
      </Wrap>
    </DefaultLayout>
  )
}

export default DaySettingsForm
