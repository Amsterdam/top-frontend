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
    projects: {
      data: projects
    },
    stadia: {
      data: stadia
    },
    settings: {
      data: settings,
      errorMessage
    }
  } = useGlobalState()

  const {
    settingsActions: {
      update
    }
  } = useGlobalActions()

  const definition = useMemo(() => createDefinition(projects ?? [], stadia ?? []), [ projects, stadia ])

  if (projects === undefined || stadia === undefined || settings === undefined) {
    return null
  }

  return <Wrap>
    <ScaffoldForm
      onSubmit={ async (values: API.PlannerSettings) => update(values)}
      initialValues={settings}
      >
      <Scaffold {...definition} />
      <FixedSubmitButton errorMessage={errorMessage} />
      <JSONDisplay />
    </ScaffoldForm>
  </Wrap>
}

export default Settings
