import React, { FC, useMemo } from "react"
import { ScaffoldForm } from "amsterdam-react-final-form"
import styled from "styled-components"

import useGlobalState from "../../hooks/useGlobalState"
import useGlobalActions from "../../hooks/useGlobalActions"
import Scaffold from "../form/Scaffold"

import { createDefinition } from "./settingsFormDefinition"
import FixedSubmitButton from "./components/FixedSubmitButton"
import JSONDisplay from "./components/JSONDisplay"

const Wrap = styled.div`
  margin: 0 8px 100px 8px  
`

const Settings: FC = () => {
  const {
    planningSettings: {
      data,
      errorMessage
    }
  } = useGlobalState()

  const {
    planningSettingsActions: {
      saveSettings
    }
  } = useGlobalActions()

  const projects = data?.projects ?? []
  const stadia = data?.stadia ?? []
  const definition = useMemo(() => createDefinition(projects, stadia), [ projects, stadia ])

  if (data?.settings === undefined) {
    return null
  }

  return <Wrap>
    <ScaffoldForm onSubmit={saveSettings} initialValues={data?.settings}>
      <Scaffold {...definition} />
      <FixedSubmitButton errorMessage={errorMessage} />
      <JSONDisplay />
    </ScaffoldForm>
  </Wrap>
}

export default Settings
