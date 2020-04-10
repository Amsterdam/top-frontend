import React, { FC, useState, useEffect, ChangeEvent, FormEvent } from "react"
import { Input, Checkbox, Button, breakpoint, color } from "@datapunt/asc-ui"
import Spinner from "../global/Spinner"
import SmallSpinner from "../global/SmallSpinner"
import Hr from "../styled/Hr"
import useGlobalState from "../../hooks/useGlobalState"
import useOnChangeState from "../../hooks/useOnChangeState"
import useOnChangeStateMultiple from "../../hooks/useOnChangeStateMultiple"
import styled from "styled-components"
import StadiaSelect from "./StadiaSelect"
import StadiaCheckboxes from "./StadiaCheckboxes"
import JSONDisplay from "./JSONDisplay"
import ErrorMessage from "../global/ErrorMessage"

const Div = styled.div`
  margin-bottom: 36px
`
const DateInputWrap = styled.div`
  @media screen and ${ breakpoint("min-width", "laptopL") } {
    max-width: 33%;
  }
`
const ColumnWrap = styled(Div)`
  column-count: 3;
  @media screen and ${ breakpoint("min-width", "laptopL") } {
    column-count: 6;
  }
`
const Label = styled.label`
  display: block
  font-weight: bold
`
const ButtonWrap = styled.div`
  display: flex
  justify-content: flex-end
  margin-bottom: 18px
  button {
    margin-left: 12px
  }
`
const H4 = styled.h4`
  margin: 18px 0 4px
`
const StyledStadiaCheckboxes = styled(StadiaCheckboxes)`
  border: 1px solid ${ color("tint", "level5") }
`

const Settings: FC = () => {
  const {
    planningSettings: {
      isFetching,
      isUpdating,
      data: {
        projects: allProjects = [],
        stadia,
        settings = undefined,
        settings: {
          opening_date = "",
          projects = undefined,
          lists: settingsLists = undefined
        } = {}
      } = {},
      errorMessage
    },
    planningSettingsActions: {
      saveSettings
    }
  } = useGlobalState()

  const showSpinner = isFetching
  const showSettings = settings !== undefined
  const disabled = isUpdating
  const showUpdatingSpinner = isUpdating
  const showErrorMessage = errorMessage !== undefined

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
  const listsSetStates = lists.map(list => {
    const { name, primaryStadium: [,,primaryStadiumSetState], secondaryStadia: [,,secondaryStadiaSetState], excludeStadia: [,,excludeStadiaSetState] } = list
    return ({ name, primaryStadiumSetState, secondaryStadiaSetState, excludeStadiaSetState })
  })
  useEffect(() => {
    if (settingsLists === undefined) return
    settingsLists.forEach(({ name, primary_stadium: primaryStadium, secondary_stadia: secondaryStadia, exclude_stadia: excludeStadia }) => {
      const list = listsSetStates.find(({ name: n }) => n === name)
      if (list === undefined) return
      if (primaryStadium !== undefined) {
        list.primaryStadiumSetState(primaryStadium)
      }
      if (secondaryStadia !== undefined) {
        list.secondaryStadiaSetState(secondaryStadia)
      }
      if (excludeStadia !== undefined) {
        list.excludeStadiaSetState(excludeStadia)
      }
    })
  }, [settingsLists]) // eslint-disable-line react-hooks/exhaustive-deps
  // @TODO: Check if final-form will fix this

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
    saveSettings(date, checkedProjects, newLists)
  }


  return (
    <div className="Settings">
      { showSpinner &&
        <Spinner />
      }
      { showSettings &&
        <>
          <form onSubmit={ onSubmit }>

            <Div>
              <DateInputWrap>
                <Label>Peildatum</Label>
                <Input type="date" value={ date } onChange={ onChangeDate } />
              </DateInputWrap>
            </Div>

            <Hr />

            <h1>Openingsredenen</h1>
            <ColumnWrap>
              { showProjects &&
                allProjects.map(project => {
                  const checked = checkedProjects!.includes(project)
                  return (
                    <div key={ project }>
                      <Checkbox checked={ checked } onChange={ onChangeProject(project) } />
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
                      <H4>1. Zoveel mogelijk</H4>
                      <StadiaSelect selected={ primaryStadium[0] } onChange={ primaryStadium[1] } />
                      <H4>2. Aanvullen met</H4>
                      <StyledStadiaCheckboxes name={ `${ name }-secondary` } stadia={ stadia! } state={ secondaryStadia[0] } setState={ secondaryStadia[2] } />
                      <H4>3. Uitsluiten</H4>
                      <StyledStadiaCheckboxes name={ `${ name }-exclude` } stadia={ stadia! } state={ excludeStadia[0] } setState={ excludeStadia[2] } />
                    </Div>
                  )
                })
              }
            </ColumnWrap>

            <Hr />

            <ButtonWrap>
              { showErrorMessage &&
                <ErrorMessage text={ errorMessage! } />
              }
              { showUpdatingSpinner &&
                <SmallSpinner />
              }
              <Button variant="secondary" type="submit" disabled={ disabled }>Bewaren</Button>
            </ButtonWrap>
          </form>

          <Hr />

          <JSONDisplay json={ settings } />
        </>
      }
    </div>
  )
}

export default Settings
