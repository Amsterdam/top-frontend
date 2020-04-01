import React, { FC, useState, useEffect, ChangeEvent, FormEvent } from "react"
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

  // Monday
  const [mondayPrimaryStadium, onChangeMondayPrimaryStadium, setMondayPrimaryStadium] = useOnChangeState("")
  const [mondaySecondaryStadia, onChangeMondaySecondaryStadia, setMondaySecondaryStadia] = useOnChangeStateMultiple([])
  const [mondayExcludedStadia, onChangeMondayExcludedStadia, setMondayExcludedStadia] = useOnChangeStateMultiple([])
  const [mondayEveningPrimaryStadium, onChangeMondayEveningPrimaryStadium, setMondayEveningPrimaryStadium] = useOnChangeState("")
  const [mondayEveningSecondaryStadia, onChangeMondayEveningSecondaryStadia, setMondayEveningSecondaryStadia] = useOnChangeStateMultiple([])
  const [mondayEveningExcludedStadia, onChangeMondayEveningExcludedStadia, setMondayEveningExcludedStadia] = useOnChangeStateMultiple([])
  // Tuesday
  const [tuesdayPrimaryStadium, onChangeTuesdayPrimaryStadium, setTuesdayPrimaryStadium] = useOnChangeState("")
  const [tuesdaySecondaryStadia, onChangeTuesdaySecondaryStadia, setTuesdaySecondaryStadia] = useOnChangeStateMultiple([])
  const [tuesdayExcludedStadia, onChangeTuesdayExcludedStadia, setTuesdayExcludedStadia] = useOnChangeStateMultiple([])
  const [tuesdayEveningPrimaryStadium, onChangeTuesdayEveningPrimaryStadium, setTuesdayEveningPrimaryStadium] = useOnChangeState("")
  const [tuesdayEveningSecondaryStadia, onChangeTuesdayEveningSecondaryStadia, setTuesdayEveningSecondaryStadia] = useOnChangeStateMultiple([])
  const [tuesdayEveningExcludedStadia, onChangeTuesdayEveningExcludedStadia, setTuesdayEveningExcludedStadia] = useOnChangeStateMultiple([])
  // Wednesday
  const [wednesdayPrimaryStadium, onChangeWednesdayPrimaryStadium, setWednesdayPrimaryStadium] = useOnChangeState("")
  const [wednesdaySecondaryStadia, onChangeWednesdaySecondaryStadia, setWednesdaySecondaryStadia] = useOnChangeStateMultiple([])
  const [wednesdayExcludedStadia, onChangeWednesdayExcludedStadia, setWednesdayExcludedStadia] = useOnChangeStateMultiple([])
  const [wednesdayEveningPrimaryStadium, onChangeWednesdayEveningPrimaryStadium, setWednesdayEveningPrimaryStadium] = useOnChangeState("")
  const [wednesdayEveningSecondaryStadia, onChangeWednesdayEveningSecondaryStadia, setWednesdayEveningSecondaryStadia] = useOnChangeStateMultiple([])
  const [wednesdayEveningExcludedStadia, onChangeWednesdayEveningExcludedStadia, setWednesdayEveningExcludedStadia] = useOnChangeStateMultiple([])
  // Thursday
  const [thursdayPrimaryStadium, onChangeThursdayPrimaryStadium, setThursdayPrimaryStadium] = useOnChangeState("")
  const [thursdaySecondaryStadia, onChangeThursdaySecondaryStadia, setThursdaySecondaryStadia] = useOnChangeStateMultiple([])
  const [thursdayExcludedStadia, onChangeThursdayExcludedStadia, setThursdayExcludedStadia] = useOnChangeStateMultiple([])
  const [thursdayEveningPrimaryStadium, onChangeThursdayEveningPrimaryStadium, setThursdayEveningPrimaryStadium] = useOnChangeState("")
  const [thursdayEveningSecondaryStadia, onChangeThursdayEveningSecondaryStadia, setThursdayEveningSecondaryStadia] = useOnChangeStateMultiple([])
  const [thursdayEveningExcludedStadia, onChangeThursdayEveningExcludedStadia, setThursdayEveningExcludedStadia] = useOnChangeStateMultiple([])
  // Friday
  const [fridayPrimaryStadium, onChangeFridayPrimaryStadium, setFridayPrimaryStadium] = useOnChangeState("")
  const [fridaySecondaryStadia, onChangeFridaySecondaryStadia, setFridaySecondaryStadia] = useOnChangeStateMultiple([])
  const [fridayExcludedStadia, onChangeFridayExcludedStadia, setFridayExcludedStadia] = useOnChangeStateMultiple([])
  const [fridayEveningPrimaryStadium, onChangeFridayEveningPrimaryStadium, setFridayEveningPrimaryStadium] = useOnChangeState("")
  const [fridayEveningSecondaryStadia, onChangeFridayEveningSecondaryStadia, setFridayEveningSecondaryStadia] = useOnChangeStateMultiple([])
  const [fridayEveningExcludedStadia, onChangeFridayEveningExcludedStadia, setFridayEveningExcludedStadia] = useOnChangeStateMultiple([])
  // Saturday
  const [saturdayPrimaryStadium, onChangeSaturdayPrimaryStadium, setSaturdayPrimaryStadium] = useOnChangeState("")
  const [saturdaySecondaryStadia, onChangeSaturdaySecondaryStadia, setSaturdaySecondaryStadia] = useOnChangeStateMultiple([])
  const [saturdayExcludedStadia, onChangeSaturdayExcludedStadia, setSaturdayExcludedStadia] = useOnChangeStateMultiple([])
  // Sunday
  const [sundayPrimaryStadium, onChangeSundayPrimaryStadium, setSundayPrimaryStadium] = useOnChangeState("")
  const [sundaySecondaryStadia, onChangeSundaySecondaryStadia, setSundaySecondaryStadia] = useOnChangeStateMultiple([])
  const [sundayExcludedStadia, onChangeSundayExcludedStadia, setSundayExcludedStadia] = useOnChangeStateMultiple([])

  const lists = [
    {
      name: "Maandag",
      primaryStadium: {
        state: mondayPrimaryStadium,
        onChange: onChangeMondayPrimaryStadium,
        setState: setMondayPrimaryStadium
      },
      secondaryStadia: {
        state: mondaySecondaryStadia,
        onChange: onChangeMondaySecondaryStadia,
        setState: setMondaySecondaryStadia
      },
      excludeStadia: {
        state: mondayExcludedStadia,
        onChange: onChangeMondayExcludedStadia,
        setState: setMondayExcludedStadia
      }
    },
    {
      name: "Maandag Avond",
      primaryStadium: {
        state: mondayEveningPrimaryStadium,
        onChange: onChangeMondayEveningPrimaryStadium,
        setState: setMondayEveningPrimaryStadium
      },
      secondaryStadia: {
        state: mondayEveningSecondaryStadia,
        onChange: onChangeMondayEveningSecondaryStadia,
        setState: setMondayEveningSecondaryStadia
      },
      excludeStadia: {
        state: mondayEveningExcludedStadia,
        onChange: onChangeMondayEveningExcludedStadia,
        setState: setMondayEveningExcludedStadia
      }
    },
    {
      name: "Dinsdag",
      primaryStadium: {
        state: tuesdayPrimaryStadium,
        onChange: onChangeTuesdayPrimaryStadium,
        setState: setTuesdayPrimaryStadium
      },
      secondaryStadia: {
        state: tuesdaySecondaryStadia,
        onChange: onChangeTuesdaySecondaryStadia,
        setState: setTuesdaySecondaryStadia
      },
      excludeStadia: {
        state: tuesdayExcludedStadia,
        onChange: onChangeTuesdayExcludedStadia,
        setState: setTuesdayExcludedStadia
      }
    },
    {
      name: "Dinsdag Avond",
      primaryStadium: {
        state: tuesdayEveningPrimaryStadium,
        onChange: onChangeTuesdayEveningPrimaryStadium,
        setState: setTuesdayEveningPrimaryStadium
      },
      secondaryStadia: {
        state: tuesdayEveningSecondaryStadia,
        onChange: onChangeTuesdayEveningSecondaryStadia,
        setState: setTuesdayEveningSecondaryStadia
      },
      excludeStadia: {
        state: tuesdayEveningExcludedStadia,
        onChange: onChangeTuesdayEveningExcludedStadia,
        setState: setTuesdayEveningExcludedStadia
      }
    },
    {
      name: "Woensdag",
      primaryStadium: {
        state: wednesdayPrimaryStadium,
        onChange: onChangeWednesdayPrimaryStadium,
        setState: setWednesdayPrimaryStadium
      },
      secondaryStadia: {
        state: wednesdaySecondaryStadia,
        onChange: onChangeWednesdaySecondaryStadia,
        setState: setWednesdaySecondaryStadia
      },
      excludeStadia: {
        state: wednesdayExcludedStadia,
        onChange: onChangeWednesdayExcludedStadia,
        setState: setWednesdayExcludedStadia
      }
    },
    {
      name: "Woensdag Avond",
      primaryStadium: {
        state: wednesdayEveningPrimaryStadium,
        onChange: onChangeWednesdayEveningPrimaryStadium,
        setState: setWednesdayEveningPrimaryStadium
      },
      secondaryStadia: {
        state: wednesdayEveningSecondaryStadia,
        onChange: onChangeWednesdayEveningSecondaryStadia,
        setState: setWednesdayEveningSecondaryStadia
      },
      excludeStadia: {
        state: wednesdayEveningExcludedStadia,
        onChange: onChangeWednesdayEveningExcludedStadia,
        setState: setWednesdayEveningExcludedStadia
      }
    },
    {
      name: "Donderdag",
      primaryStadium: {
        state: thursdayPrimaryStadium,
        onChange: onChangeThursdayPrimaryStadium,
        setState: setThursdayPrimaryStadium
      },
      secondaryStadia: {
        state: thursdaySecondaryStadia,
        onChange: onChangeThursdaySecondaryStadia,
        setState: setThursdaySecondaryStadia
      },
      excludeStadia: {
        state: thursdayExcludedStadia,
        onChange: onChangeThursdayExcludedStadia,
        setState: setThursdayExcludedStadia
      }
    },
    {
      name: "Donderdag Avond",
      primaryStadium: {
        state: thursdayEveningPrimaryStadium,
        onChange: onChangeThursdayEveningPrimaryStadium,
        setState: setThursdayEveningPrimaryStadium
      },
      secondaryStadia: {
        state: thursdayEveningSecondaryStadia,
        onChange: onChangeThursdayEveningSecondaryStadia,
        setState: setThursdayEveningSecondaryStadia
      },
      excludeStadia: {
        state: thursdayEveningExcludedStadia,
        onChange: onChangeThursdayEveningExcludedStadia,
        setState: setThursdayEveningExcludedStadia
      }
    },
    {
      name: "Vrijdag",
      primaryStadium: {
        state: fridayPrimaryStadium,
        onChange: onChangeFridayPrimaryStadium,
        setState: setFridayPrimaryStadium
      },
      secondaryStadia: {
        state: fridaySecondaryStadia,
        onChange: onChangeFridaySecondaryStadia,
        setState: setFridaySecondaryStadia
      },
      excludeStadia: {
        state: fridayExcludedStadia,
        onChange: onChangeFridayExcludedStadia,
        setState: setFridayExcludedStadia
      }
    },
    {
      name: "Vrijdag Avond",
      primaryStadium: {
        state: fridayEveningPrimaryStadium,
        onChange: onChangeFridayEveningPrimaryStadium,
        setState: setFridayEveningPrimaryStadium
      },
      secondaryStadia: {
        state: fridayEveningSecondaryStadia,
        onChange: onChangeFridayEveningSecondaryStadia,
        setState: setFridayEveningSecondaryStadia
      },
      excludeStadia: {
        state: fridayEveningExcludedStadia,
        onChange: onChangeFridayEveningExcludedStadia,
        setState: setFridayEveningExcludedStadia
      }
    },
    {
      name: "Zaterdag Weekend",
      primaryStadium: {
        state: saturdayPrimaryStadium,
        onChange: onChangeSaturdayPrimaryStadium,
        setState: setSaturdayPrimaryStadium
      },
      secondaryStadia: {
        state: saturdaySecondaryStadia,
        onChange: onChangeSaturdaySecondaryStadia,
        setState: setSaturdaySecondaryStadia
      },
      excludeStadia: {
        state: saturdayExcludedStadia,
        onChange: onChangeSaturdayExcludedStadia,
        setState: setSaturdayExcludedStadia
      }
    },
    {
      name: "Zondag Weekend",
      primaryStadium: {
        state: sundayPrimaryStadium,
        onChange: onChangeSundayPrimaryStadium,
        setState: setSundayPrimaryStadium
      },
      secondaryStadia: {
        state: sundaySecondaryStadia,
        onChange: onChangeSundaySecondaryStadia,
        setState: setSundaySecondaryStadia
      },
      excludeStadia: {
        state: sundayExcludedStadia,
        onChange: onChangeSundayExcludedStadia,
        setState: setSundayExcludedStadia
      }
    }
  ]
  useEffect(() => {
    if (settingsLists === undefined) return
    settingsLists.forEach(({ name, primary_stadium: primaryStadium, secondary_stadia: secondaryStadia, exclude_stadia: excludeStadia }) => {
      const list = lists.find(({ name: n }) => n === name)
      if (list === undefined) return
      if (primaryStadium !== undefined) {
        list.primaryStadium.setState(primaryStadium)
      }
      if (secondaryStadia !== undefined) {
        list.secondaryStadia.setState(secondaryStadia)
      }
      if (excludeStadia !== undefined) {
        list.excludeStadia.setState(excludeStadia)
      }
    })
  }, [settingsLists, lists])

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (disabled) return
    if (date === undefined) return
    if (checkedProjects === undefined) return
    if (settingsLists === undefined) return
    const newLists = lists.map(({ name, primaryStadium, secondaryStadia, excludeStadia }) => ({
      name: name,
      primary_stadium: primaryStadium.state || undefined,
      secondary_stadia: secondaryStadia.state,
      exclude_stadia: excludeStadia.state,
      number_of_lists: 0,
      length_of_lists: 0
    }))
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
                      <StadiaSelect selected={ primaryStadium.state ? [primaryStadium.state] : undefined } onChange={ primaryStadium.onChange } />
                      <h4>Secondary stadia</h4>
                      <StadiaSelect selected={ secondaryStadia.state } onChange={ secondaryStadia.onChange } multiple={ true } />
                      <h4>Excluded stadia</h4>
                      <StadiaSelect selected={ excludeStadia.state } onChange={ excludeStadia.onChange } multiple={ true } />
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
