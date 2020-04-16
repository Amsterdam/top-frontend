import React, { FC, FormEvent } from "react"
import { Input, Button, breakpoint, color } from "@datapunt/asc-ui"
import Spinner from "../global/Spinner"
import SmallSpinner from "../global/SmallSpinner"
import Hr from "../styled/Hr"
import useGlobalState from "../../hooks/useGlobalState"
import useInputState, { useInputStateMany } from "../../hooks/useInputState"
import styled from "styled-components"
import StadiaSelect from "./StadiaSelect"
import Checkboxes from "./Checkboxes"
import ErrorMessage from "../global/ErrorMessage"
import JSONDisplay from "./JSONDisplay"

const Wrap = styled.div`
  margin-bottom: 100px
`
const DateInputWrap = styled.div`
  @media screen and ${ breakpoint("min-width", "laptopL") } {
    max-width: 33%;
  }
`
const Div = styled.div`
  margin-bottom: 36px
`
const ColumnWrap = styled(Div)`
  column-count: 3;
  @media screen and ${ breakpoint("min-width", "laptopL") } {
    column-count: 6;
  }
`
const ButtonWrap = styled.div`
  position: fixed
  width: 100%
  bottom: 0
  left: 0
  display: flex
  background-color: ${ color("tint", "level1") };
  border-top: 1px solid ${ color("tint", "level5") }
  justify-content: flex-end
  padding: 18px
  button {
    margin-left: 12px
  }
`
const H4 = styled.h4`
  margin: 18px 0 4px
`
const StyledCheckboxes = styled(Checkboxes)`
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
          opening_date = undefined,
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
  const hasSettings = settings !== undefined
  const showForm = hasSettings
  const showJSON = hasSettings
  const showUpdatingSpinner = isUpdating
  const showErrorMessage = errorMessage !== undefined

  // opening date
  const [date, onChangeDate] = useInputState(opening_date)

  // projects
  const [checkedProjects, projectsOnChangeHOF] = useInputStateMany(projects)

  // stadia
  const getSettingsListByName = (name: string) => settingsLists?.find(({ name: n }) => n === name)
  const lists = [
    {
      name: "Maandag",
      primaryStadium: useInputState(getSettingsListByName("Maandag")?.primary_stadium),
      secondaryStadia: useInputStateMany(getSettingsListByName("Maandag")?.secondary_stadia),
      excludeStadia: useInputStateMany(getSettingsListByName("Maandag")?.exclude_stadia)
    },
    {
      name: "Maandag Avond",
      primaryStadium: useInputState(getSettingsListByName("Maandag Avond")?.primary_stadium),
      secondaryStadia: useInputStateMany(getSettingsListByName("Maandag Avond")?.secondary_stadia),
      excludeStadia: useInputStateMany(getSettingsListByName("Maandag Avond")?.exclude_stadia)
    },
    {
      name: "Dinsdag",
      primaryStadium: useInputState(getSettingsListByName("Dinsdag")?.primary_stadium),
      secondaryStadia: useInputStateMany(getSettingsListByName("Dinsdag")?.secondary_stadia),
      excludeStadia: useInputStateMany(getSettingsListByName("Dinsdag")?.exclude_stadia)
    },
    {
      name: "Dinsdag Avond",
      primaryStadium: useInputState(getSettingsListByName("Dinsdag Avond")?.primary_stadium),
      secondaryStadia: useInputStateMany(getSettingsListByName("Dinsdag Avond")?.secondary_stadia),
      excludeStadia: useInputStateMany(getSettingsListByName("Dinsdag Avond")?.exclude_stadia)
    },
    {
      name: "Woensdag",
      primaryStadium: useInputState(getSettingsListByName("Woensdag")?.primary_stadium),
      secondaryStadia: useInputStateMany(getSettingsListByName("Woensdag")?.secondary_stadia),
      excludeStadia: useInputStateMany(getSettingsListByName("Woensdag")?.exclude_stadia)
    },
    {
      name: "Woensdag Avond",
      primaryStadium: useInputState(getSettingsListByName("Woensdag Avond")?.primary_stadium),
      secondaryStadia: useInputStateMany(getSettingsListByName("Woensdag Avond")?.secondary_stadia),
      excludeStadia: useInputStateMany(getSettingsListByName("Woensdag Avond")?.exclude_stadia)
    },
    {
      name: "Donderdag",
      primaryStadium: useInputState(getSettingsListByName("Donderdag")?.primary_stadium),
      secondaryStadia: useInputStateMany(getSettingsListByName("Donderdag")?.secondary_stadia),
      excludeStadia: useInputStateMany(getSettingsListByName("Donderdag")?.exclude_stadia)
    },
    {
      name: "Donderdag Avond",
      primaryStadium: useInputState(getSettingsListByName("Donderdag Avond")?.primary_stadium),
      secondaryStadia: useInputStateMany(getSettingsListByName("Donderdag Avond")?.secondary_stadia),
      excludeStadia: useInputStateMany(getSettingsListByName("Donderdag Avond")?.exclude_stadia)
    },
    {
      name: "Vrijdag",
      primaryStadium: useInputState(getSettingsListByName("Vrijdag")?.primary_stadium),
      secondaryStadia: useInputStateMany(getSettingsListByName("Vrijdag")?.secondary_stadia),
      excludeStadia: useInputStateMany(getSettingsListByName("Vrijdag")?.exclude_stadia)
    },
    {
      name: "Vrijdag Avond",
      primaryStadium: useInputState(getSettingsListByName("Vrijdag Avond")?.primary_stadium),
      secondaryStadia: useInputStateMany(getSettingsListByName("Vrijdag Avond")?.secondary_stadia),
      excludeStadia: useInputStateMany(getSettingsListByName("Vrijdag Avond")?.exclude_stadia)
    },
    {
      name: "Zaterdag Weekend",
      primaryStadium: useInputState(getSettingsListByName("Zaterdag Weekend")?.primary_stadium),
      secondaryStadia: useInputStateMany(getSettingsListByName("Zaterdag Weekend")?.secondary_stadia),
      excludeStadia: useInputStateMany(getSettingsListByName("Zaterdag Weekend")?.exclude_stadia)
    },
    {
      name: "Zondag Weekend",
      primaryStadium: useInputState(getSettingsListByName("Zondag Weekend")?.primary_stadium),
      secondaryStadia: useInputStateMany(getSettingsListByName("Zondag Weekend")?.secondary_stadia),
      excludeStadia: useInputStateMany(getSettingsListByName("Zondag Weekend")?.exclude_stadia)
    }
  ]

  const isValidFormState = date !== undefined && checkedProjects !== undefined && settingsLists !== undefined
  const disabled = isUpdating || !isValidFormState

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    if (!isValidFormState) return
    const newLists = lists.map(({ name, primaryStadium, secondaryStadia, excludeStadia }) => ({
      name: name,
      primary_stadium: primaryStadium[0] || undefined,
      secondary_stadia: secondaryStadia[0],
      exclude_stadia: excludeStadia[0]
    }))
    saveSettings(date, checkedProjects, newLists)
  }

  return (
    <Wrap>
      { showSpinner &&
        <Spinner />
      }
      { showForm &&
        <form onSubmit={ onSubmit }>

          <h1>Peildatum</h1>
          <Div>
            <DateInputWrap>
              <Input type="date" value={ date } onChange={ onChangeDate } />
            </DateInputWrap>
          </Div>

          <Hr />

          <h1>Openingsredenen</h1>
          <ColumnWrap>
            <Checkboxes options={ allProjects } state={ checkedProjects! } onChangeHOF={ projectsOnChangeHOF } />
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
                    <StyledCheckboxes name={ `${ name }-secondary` } options={ stadia! } state={ secondaryStadia[0] } onChangeHOF={ secondaryStadia[1] } />
                    <H4>3. Uitsluiten</H4>
                    <StyledCheckboxes name={ `${ name }-exclude` } options={ stadia! } state={ excludeStadia[0] } onChangeHOF={ excludeStadia[1] } />
                  </Div>
                )
              })
            }
          </ColumnWrap>

          <ButtonWrap>
            { showErrorMessage &&
              <ErrorMessage text={ errorMessage! } />
            }
            { showUpdatingSpinner &&
              <SmallSpinner />
            }
            <Button variant="secondary" disabled={ disabled }>Bewaren</Button>
          </ButtonWrap>
        </form>
      }

      { showJSON &&
        <>
          <Hr />
          <JSONDisplay json={ settings } />
        </>
      }
    </Wrap>
  )
}

export default Settings
