import React, { FC, useCallback, useMemo, useState } from "react"
import { Link, RouteComponentProps } from "@reach/router"
import styled from "styled-components"
import { ScaffoldForm } from "amsterdam-react-final-form"
import { Heading } from "@amsterdam/asc-ui"

import to from "app/features/shared/routing/to"
import { useTeamSettings } from "app/state/rest"

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
    postal_codes: settings.postal_codes?.filter((i: any) => i != null) ?? []
  })

type Props = {
  teamSettingsId: number
}

const TeamSettingsForm: FC<RouteComponentProps<Props>> = ({ teamSettingsId }) => {
  const { data: teamSettings, execPut, isBusy: isBusySettings } = useTeamSettings(teamSettingsId!)
  const [ errorMessage, setErrorMessage ] = useState("")

  const definition = useMemo(
    () => createDefinition(teamSettings?.project_choices ?? [], teamSettings?.stadia_choices ?? []),
    [ teamSettings ]
  )

  const handleSubmit = useCallback(async (teamSettings: any) => {
    const values = filterEmptyPostalCodes(teamSettings.settings)
    setErrorMessage("")

    try {
      await execPut({
        settings: values,
        name: teamSettings.name
      }, { skipCacheClear: true, useResponseAsCache: true })
    } catch (error) {
      setErrorMessage(error.response.data.message)
      return error
    }
  }, [ execPut, setErrorMessage ])

  if (!teamSettings || isBusySettings) {
    return <CenteredSpinner size={ 60 } />
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
      <ScaffoldForm onSubmit={ handleSubmit } initialValues={ teamSettings }>
        <Scaffold { ...definition } />
        <FixedSubmitButton errorMessage={ errorMessage } />
        <JSONDisplay title="Huidige settings (JSON)" />
      </ScaffoldForm>
    </Wrap>
  </DefaultLayout>
}

export default TeamSettingsForm
