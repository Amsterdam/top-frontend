import React, { FC, useState, useEffect, ChangeEvent, FormEvent } from "react"
import { Spinner, Button } from "@datapunt/asc-ui"
import useGlobalState from "../../hooks/useGlobalState"
import useOnChangeState from "../../hooks/useOnChangeState"
import styled from "styled-components"

const Div = styled.div`
  margin-bottom: 18px
`
const Label = styled.label`
  margin-right: 12px
`
const ButtonWrap = styled.div`
  display: flex
  justify-content: flex-end
  button {
    margin-left: 12px
  }
`

type Project = string
type Projects = Project[]

const Settings: FC = () => {

  const {
    planningSettings: {
      isFetching,
      isUpdating,
      data: {
        projects = [],
        settings = undefined,
        settings: {
          opening_date = "",
          opening_reasons = []
        } = {}
      } = {}
    },
    planningSettingsActions: {
      saveSettings
    }
  } = useGlobalState()

  const showSpinner = isFetching
  const showSettings = settings !== undefined
  const disabled = isUpdating === true
  const showUpdatingSpinner = disabled

  const [date, onChangeDate, setDate] = useOnChangeState(opening_date)
  useEffect(() => setDate(opening_date), [opening_date])

  const [checkedProjects, setProjects] = useState<Projects>(opening_reasons)
  const addToProjects = (project: Project) => setProjects(checkedProjects.concat(project))
  const removeFromProjects = (project: Project) => setProjects(checkedProjects.filter(p => p !== project))
  useEffect(() => {
    if (opening_reasons.length === 0) return
    setProjects(opening_reasons)
  }, [opening_reasons])
  const onChangeProject= (project: Project) => (event: ChangeEvent<HTMLInputElement>) => {
    const method = event.target.checked ? addToProjects : removeFromProjects
    method(project)
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (disabled) return
    saveSettings(date, checkedProjects)
  }

  return (
    <div className="Settings">
      <h1>Settings</h1>
      { showSpinner &&
        <Spinner size={ 60 }/>
      }
      { showSettings &&
        <form onSubmit={ onSubmit }>
          <Div>
            <Label>openings datum</Label>
            <input type="date" value={ date } onChange={ onChangeDate } />
          </Div>
          <Div>
          { projects.map(project => {
              const checked = checkedProjects.includes(project)
              return (
                <div key={ project }>
                  <input type="checkbox" checked={ checked } onChange={ onChangeProject(project) }/>
                  <label>{ project }</label>
                </div>
              )
            })
          }
          </Div>
          <ButtonWrap>
            { showUpdatingSpinner &&
              <Spinner size={ 40 } />
            }
            <Button variant="secondary" type="submit" disabled={ disabled }>Opslaan</Button>
          </ButtonWrap>
        </form>
      }
      { showSettings &&
        <>
          <h1>Huidige settings (JSON)</h1>
          <pre><code>{ JSON.stringify(settings, null, 2) }</code></pre>
        </>
      }
    </div>
  )
}

export default Settings
