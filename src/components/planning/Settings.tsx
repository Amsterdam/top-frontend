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
import { Grid, GridCell } from './Grid'

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
  row: number,
  column: number,
  title: string,
  collapsed: boolean
}

// We use row and column indices here because:
const DAY_PARTS:DayPart[] = [
  { row: 1, column: 1, title: 'Maandag', collapsed: false },
  { row: 3, column: 1, title: 'Maandag avond', collapsed: true },
  { row: 1, column: 2, title: 'Dinsdag', collapsed: false },
  { row: 3, column: 2, title: 'Dinsdag avond', collapsed: true },
  { row: 1, column: 3, title: 'Woensdag', collapsed: false },
  { row: 3, column: 3, title: 'Woensdag avond', collapsed: true },
  { row: 1, column: 4, title: 'Donderdag', collapsed: false },
  { row: 3, column: 4, title: 'Donderdag avond', collapsed: true },
  { row: 1, column: 5, title: 'Vrijdag', collapsed: false },
  { row: 3, column: 5, title: 'Vrijdag avond', collapsed: true },
  { row: 2, column: 1, title: 'Zaterdag weekend', collapsed: false },
  { row: 2, column: 2, title: 'Zondag weekend', collapsed: false },
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
                { DAY_PARTS.map(({ title, row, column, collapsed }, index) => (
                  <GridCell row={row} column={column}>
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
