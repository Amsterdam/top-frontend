import React, { FC, useState, useEffect, useCallback, ChangeEvent, FormEvent } from "react"
import { Button } from "@datapunt/asc-ui"
import Spinner from "../global/Spinner"
import SmallSpinner from "../global/SmallSpinner"
import Hr from "../styled/Hr"
import useGlobalState from "../../hooks/useGlobalState"
import useOnChangeState from "../../hooks/useOnChangeState"
import useOnChangeStateMultiple from "../../hooks/useOnChangeStateMultiple"
import styled from "styled-components"
import StadiaSelect from "./StadiaSelect"

const Div = styled.div`
  margin-bottom: 18px
`
const ColumnWrap = styled(Div)`
  column-count: 6
`
const Label = styled.label`
  display: block
  font-weight: bold
`
const ButtonWrap = styled.div`
  display: flex
  justify-content: flex-end
  button {
    margin-left: 12px
  }
`

const Settings: FC = () => {

  const {
    planningSettings: {
      isFetching,
      isUpdating,
      data: {
        projects: allProjects = [],
        settings = undefined,
        settings: {
          opening_date = "",
          projects = undefined,
          lists: settingsLists = undefined
        } = {}
      } = {}
    },
    planningSettingsActions: {
      saveSettings
    }
  } = useGlobalState()

  const showSpinner = isFetching
  const showSettings = settings !== undefined
  const disabled = isUpdating
  const showUpdatingSpinner = isUpdating

  // opening date
  const [date, onChangeDate, setDate] = useOnChangeState("")
  useEffect(() => setDate(opening_date), [setDate, opening_date])

  // projects
  const [checkedProjects, setProjects] = useState<Projects>()
  const addToProjects = (project: Project) => setProjects((checkedProjects || []).concat(project))
  const removeFromProjects = (project: Project) => setProjects((checkedProjects || []).filter(p => p !== project))
  const onChangeProject = (project: Project) => (event: ChangeEvent<HTMLInputElement>) => {
    const method = event.target.checked ? addToProjects : removeFromProjects
    method(project)
  }
  const showProjects = checkedProjects !== undefined
  useEffect(() => {
    if (projects === undefined) return
    setProjects(projects)
  }, [projects])

  // stadia
  const lists = [
    {
      name: "Maandag",
      primaryStadium: useOnChangeState(""),
      secondaryStadia: useOnChangeStateMultiple([]),
      excludeStadia: useOnChangeStateMultiple([])
    },
    {
      name: "Maandag Avond",
      primaryStadium: useOnChangeState(""),
      secondaryStadia: useOnChangeStateMultiple([]),
      excludeStadia: useOnChangeStateMultiple([])
    },
    {
      name: "Dinsdag",
      primaryStadium: useOnChangeState(""),
      secondaryStadia: useOnChangeStateMultiple([]),
      excludeStadia: useOnChangeStateMultiple([])
    },
    {
      name: "Dinsdag Avond",
      primaryStadium: useOnChangeState(""),
      secondaryStadia: useOnChangeStateMultiple([]),
      excludeStadia: useOnChangeStateMultiple([])
    },
    {
      name: "Woensdag",
      primaryStadium: useOnChangeState(""),
      secondaryStadia: useOnChangeStateMultiple([]),
      excludeStadia: useOnChangeStateMultiple([])
    },
    {
      name: "Woensdag Avond",
      primaryStadium: useOnChangeState(""),
      secondaryStadia: useOnChangeStateMultiple([]),
      excludeStadia: useOnChangeStateMultiple([])
    },
    {
      name: "Donderdag",
      primaryStadium: useOnChangeState(""),
      secondaryStadia: useOnChangeStateMultiple([]),
      excludeStadia: useOnChangeStateMultiple([])
    },
    {
      name: "Donderdag Avond",
      primaryStadium: useOnChangeState(""),
      secondaryStadia: useOnChangeStateMultiple([]),
      excludeStadia: useOnChangeStateMultiple([])
    },
    {
      name: "Vrijdag",
      primaryStadium: useOnChangeState(""),
      secondaryStadia: useOnChangeStateMultiple([]),
      excludeStadia: useOnChangeStateMultiple([])
    },
    {
      name: "Vrijdag Avond",
      primaryStadium: useOnChangeState(""),
      secondaryStadia: useOnChangeStateMultiple([]),
      excludeStadia: useOnChangeStateMultiple([])
    },
    {
      name: "Zaterdag Weekend",
      primaryStadium: useOnChangeState(""),
      secondaryStadia: useOnChangeStateMultiple([]),
      excludeStadia: useOnChangeStateMultiple([])
    },
    {
      name: "Zondag Weekend",
      primaryStadium: useOnChangeState(""),
      secondaryStadia: useOnChangeStateMultiple([]),
      excludeStadia: useOnChangeStateMultiple([])
    }
  ]
  const initializeStadia = () => {
    if (settingsLists === undefined) return
    settingsLists.forEach(({ name, primary_stadium: primaryStadium, secondary_stadia: secondaryStadia, exclude_stadia: excludeStadia }) => {
      const list = lists.find(({ name: n }) => n === name)
      if (list === undefined) return
      if (primaryStadium !== undefined) {
        list.primaryStadium[2](primaryStadium)
      }
      if (secondaryStadia !== undefined) {
        list.secondaryStadia[2](secondaryStadia)
      }
      if (excludeStadia !== undefined) {
        list.excludeStadia[2](excludeStadia)
      }
    })
  }
  const initializeStadiaStable = useCallback(initializeStadia, [settingsLists])
  useEffect(initializeStadiaStable, [settingsLists, initializeStadiaStable])

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (disabled) return
    if (date === undefined) return
    if (checkedProjects === undefined) return
    if (settingsLists === undefined) return
    const newLists = lists.map(({ name, primaryStadium, secondaryStadia, excludeStadia }) => ({
      name: name,
      primary_stadium: primaryStadium[0] || undefined,
      secondary_stadia: secondaryStadia[0],
      exclude_stadia: excludeStadia[0],
      // @TODO: Remove these two props when removed from API
      number_of_lists: 0,
      length_of_lists: 0
    }))
    console.log(newLists)
    saveSettings(date, checkedProjects, newLists)
  }

  const [showJSON, setShowJSON] = useState(false)
  const onClickShowJSON = () => setShowJSON(!showJSON)

  return (
    <div className="Settings">
      { showSpinner &&
        <Spinner />
      }
      { showSettings &&
        <>
          <form onSubmit={ onSubmit }>

            <Div>
              <Label>openings datum</Label>
              <input type="date" value={ date } onChange={ onChangeDate } />
            </Div>

            <Hr />

            <h1>Openings redenen</h1>
            <ColumnWrap>
            { showProjects &&
              allProjects.map(project => {
                const checked = checkedProjects!.includes(project)
                return (
                  <div key={ project }>
                    <input type="checkbox" checked={ checked } onChange={ onChangeProject(project) }/>
                    <label>{ project }</label>
                  </div>
                )
              })
            }
            </ColumnWrap>

            <Hr />

            <h1>Stadia</h1>
            <ColumnWrap>
              { lists.map(list => {
                  const {
                    name,
                    primaryStadium,
                    secondaryStadia,
                    excludeStadia
                  } = list
                  return (
                    <Div key={ name }>
                      <h3>{ name }</h3>
                      <h4>Primary stadium</h4>
                      <StadiaSelect selected={ primaryStadium[0] ? [primaryStadium[0]] : undefined } onChange={ primaryStadium[1] } />
                      <h4>Secondary stadia</h4>
                      <StadiaSelect selected={ secondaryStadia[0] } onChange={ secondaryStadia[1] } multiple={ true } />
                      <h4>Excluded stadia</h4>
                      <StadiaSelect selected={ excludeStadia[0] } onChange={ excludeStadia[1] } multiple={ true } />
                    </Div>
                  )
                })
              }
            </ColumnWrap>

            <ButtonWrap>
              { showUpdatingSpinner &&
                <SmallSpinner />
              }
              <Button variant="secondary" type="submit" disabled={ disabled }>Opslaan</Button>
            </ButtonWrap>
          </form>

          <Hr />

          <h1>Huidige settings (JSON)</h1>
          <Button onClick={ onClickShowJSON }>{ `${ showJSON ? "Verberg" : "Toon" } JSON` }</Button>
          { showJSON &&
            <div>
              <pre><code>{ JSON.stringify(settings, null, 2) }</code></pre>
            </div>
          }
        </>
      }
    </div>
  )
}

export default Settings
