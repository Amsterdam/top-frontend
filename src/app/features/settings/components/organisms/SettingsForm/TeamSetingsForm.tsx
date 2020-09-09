import React, { FC, useCallback, useMemo, useState } from "react"
import { RouteComponentProps } from "@reach/router"
import { ScaffoldForm } from "amsterdam-react-final-form"
import styled from "styled-components"

import { useProjectConstants, useTeamSettings, useStadiaConstants } from "app/state/rest"

import Scaffold from "app/features/shared/components/form/Scaffold"
import DefaultLayout from "app/features/shared/components/layouts/DefaultLayout/DefaultLayout"

import { createDefinition } from "./teamSettingsFormDefinition"
import FixedSubmitButton from "./components/FixedSubmitButton"
import JSONDisplay from "./components/JSONDisplay"
import CenteredSpinner from "../../../../shared/components/atoms/CenteredSpinner/CenteredSpinner"

const Wrap = styled.div`
  margin: 0 8px 100px 8px
`

const filterEmptyPostalCodes = (settings: Components.Schemas.TeamSettings) =>
  ({ ...settings, postal_codes: settings.settings.postal_codes?.filter(i => i != null) ?? []}
)

type Props = {
    teamSettingsId: number
}

const TeamSettingsForm: FC<RouteComponentProps<Props>> = ({ teamSettingsId }) => {
  const { data: settings, execPost, isBusy: isBusySettings } = useTeamSettings(teamSettingsId!)
  const { data: projects, isBusy: isBusyProjects } = useProjectConstants()
  const { data: stadia, isBusy: isBusyStadia } = useStadiaConstants()

  const [ errorMessage, setErrorMessage ] = useState("")

  const definition = useMemo(
    () => createDefinition(projects?.constants ?? [], stadia?.constants ?? []),
    [ projects, stadia ]
  )

  const handleSubmit = useCallback(async (settings: Components.Schemas.TeamSettings) => {
    const values = filterEmptyPostalCodes(settings)
    setErrorMessage("")

    try {
      await execPost(values, { skipCacheClear: true, useResponseAsCache: true })
    } catch(error) {
      setErrorMessage(error.response.data.message)
      return error
    }
  }, [ execPost, setErrorMessage ])

  if (!settings || isBusySettings || isBusyProjects || isBusyStadia) { return <CenteredSpinner size={60} /> }

  return <DefaultLayout>
    <Wrap>
      <ScaffoldForm onSubmit={handleSubmit} initialValues={settings}>
        <Scaffold {...definition} />
        <FixedSubmitButton errorMessage={errorMessage} />
        <JSONDisplay />
      </ScaffoldForm>
    </Wrap>
  </DefaultLayout>
}

export default TeamSettingsForm
