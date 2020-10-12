import React, { FC, useCallback, useMemo, useState } from "react"
import { RouteComponentProps, Link } from "@reach/router"
import { ScaffoldForm } from "amsterdam-react-final-form"
import styled from "styled-components"
import to from "app/features/shared/routing/to"
import { useTeamSettings } from "app/state/rest"

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
  ({ ...settings, postal_codes: settings.postal_codes?.filter((i: any) => i != null) ?? []}
)

type Props = {
    teamSettingsId: number
}

const TeamSettingsForm: FC<RouteComponentProps<Props>> = ({ teamSettingsId }) => {
  const { data: teamSettings, execPut, isBusy: isBusySettings } = useTeamSettings(teamSettingsId!)
  const [ errorMessage, setErrorMessage ] = useState("")

  const definition = useMemo(
    () => createDefinition(teamSettings?.team_type.project_choices ?? [], teamSettings?.team_type.stadia_choices ?? []),
    [ teamSettings ]
  )

  const handleSubmit = useCallback(async (teamSettings: any) => {
    const values = filterEmptyPostalCodes(teamSettings.settings)
    setErrorMessage("")
    // @ts-ignore
    const f_projects = (acc, cur, i, a) => {
      if (teamSettings?.team_type.project_choices.includes(cur)){
        acc.push(cur)
      }
      return acc
    }
    values.projects = values.projects.reduce(f_projects, [])
    // @ts-ignore
    Object.keys(values.days).map(day => {
      Object.keys(values.days[day]).map(part => {
        // @ts-ignore
        const f_stadia = (acc, cur, i, a) => {
          if (teamSettings?.team_type.stadia_choices.includes(cur)){
            acc.push(cur)
          }
          return acc
        }
        const stadia_sets = [
          "secondary_stadia",
          "exclude_stadia"
        ]
        if (!teamSettings.stadia.includes(values.days[day][part]["primary_stadium"])){
          delete values.days[day][part]
        } else {
          stadia_sets.map(stadia_set => {
            if (values.days[day][part][stadia_set]){
              values.days[day][part][stadia_set] = values.days[day][part][stadia_set].reduce(f_stadia, [])
            }
            return stadia_set
          })
        }
        return part
      })
      return day
    })

    try {
      await execPut({
        settings: values, 
        name: teamSettings.name
      }, { skipCacheClear: true, useResponseAsCache: true })
    } catch(error) {
      setErrorMessage(error.response.data.message)
      return error
    }
  }, [ execPut, setErrorMessage ])

  if (!teamSettings || isBusySettings) { return <CenteredSpinner size={60} /> }

  return <DefaultLayout>
    <Wrap>
      <Link to={to("/team-settings")}>
        Alle instellingen
      </Link><br></br><br></br><br></br>
      <span>Wijzig instellingen voor:</span>
      <h2>{teamSettings.name}</h2>
      <ScaffoldForm onSubmit={handleSubmit} initialValues={teamSettings}>
        <Scaffold {...definition} />
        <FixedSubmitButton errorMessage={errorMessage} />
        <JSONDisplay />
      </ScaffoldForm>
    </Wrap>
  </DefaultLayout>
}

export default TeamSettingsForm
