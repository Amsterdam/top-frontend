import React, { FC } from "react"
import { Form } from "react-final-form"
import {breakpoint, Button, color} from "@datapunt/asc-ui"
import styled from "styled-components"
import JSONDisplay from "./JSONDisplay"
import DayPartSettings from "./DayPartSettings"
import ProjectsCheckboxes from "./ProjectCheckboxes"
import useGlobalState from "../../hooks/useGlobalState"
import ErrorMessage from "../global/ErrorMessage"
import SmallSpinner from "../global/SmallSpinner"
import Spinner from "../global/Spinner"
import {isRequired} from "../form-components/validators/isRequired"
import TextField from "../form-components/TextField"
import { Grid, GridCell, GridArea } from './Grid'

const Wrap = styled.div`
  margin-bottom: 100px;
`
const DateInputWrap = styled.div`
  @media screen and ${ breakpoint("min-width", "laptopL") } {
    max-width: 33%;
  }
`
const Div = styled.div`
  margin-bottom: 36px;
`
const ColumnWrap = styled(Div)`
  column-count: 3;
  @media screen and ${ breakpoint("min-width", "laptopL") } {
    column-count: 5;
  }
`

const ButtonWrap = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
  left: 0;
  display: flex;
  background-color: ${ color("tint", "level1") };
  border-top: 1px solid ${ color("tint", "level5") };
  justify-content: flex-end;
  padding: 18px;
  button {
    margin-left: 12px;
  }
`

type DayPart = {
  area: GridArea,
  title: string,
  collapsed: boolean
}

const DAY_PARTS:DayPart[] = [
  { area: 'monday', title: 'Maandag', collapsed: false },
  { area: 'monday_evening', title: 'Maandag avond', collapsed: true },
  { area: 'tuesday', title: 'Dinsdag', collapsed: false },
  { area: 'tuesday_evening', title: 'Dinsdag avond', collapsed: true },
  { area: 'wednesday', title: 'Woensdag', collapsed: false },
  { area: 'wednesday_evening', title: 'Woensdag avond', collapsed: true },
  { area: 'thursday', title: 'Donderdag', collapsed: false },
  { area: 'thursday_evening', title: 'Donderdag avond', collapsed: true },
  { area: 'friday', title: 'Vrijdag', collapsed: false },
  { area: 'friday_evening', title: 'Vrijdag avond', collapsed: true },
  { area: 'saturday', title: 'Zaterdag weekend', collapsed: false },
  { area: 'sunday', title: 'Zondag weekend', collapsed: false },
]

const Settings: FC = () => {
  const {
    planningSettings: {
      isFetching,
      isUpdating,
      data,
      errorMessage
    },
    planningSettingsActions: {
      saveSettings
    }
  } = useGlobalState()

  const onSubmit = (values:PlanningSettings) => {
    saveSettings(
      values.opening_date,
      values.projects,
      values.lists
    )
  }

  return isFetching
  ? <Spinner />
  : <Wrap>
        <Form
          onSubmit={onSubmit}
          initialValues={data?.settings}
          render={({ handleSubmit, values, hasValidationErrors }) => (<>
            <form onSubmit={handleSubmit}>
              <h1>Peildatum</h1>
              <Div>
                <DateInputWrap>
                  <TextField
                    name='opening_date'
                    type='date'
                    validate={isRequired}
                  />
                </DateInputWrap>
              </Div>
              <ColumnWrap>
                <ProjectsCheckboxes projects={data?.projects ?? []} />
              </ColumnWrap>
              <Grid>
                { DAY_PARTS.map(({ title, area, collapsed }, index) => (
                  <GridCell area={area}>
                    <DayPartSettings
                      key={title}
                      index={index}
                      day={title}
                      collapsed={collapsed}
                      stadia={data?.stadia ?? []}
                    />
                  </GridCell>
                )) }
              </Grid>
              <ButtonWrap>
                { errorMessage && <ErrorMessage text={ errorMessage! } />}
                { isUpdating && <SmallSpinner />}
                <Button variant="secondary" disabled={isUpdating || hasValidationErrors}>Bewaren</Button>
              </ButtonWrap>
            </form>
            <JSONDisplay json={ values } />
          </>)}
        />
    </Wrap>
}

export default Settings
