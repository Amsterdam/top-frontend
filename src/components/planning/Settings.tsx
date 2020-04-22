import React, { FC } from "react"
import { Form } from "react-final-form"
import {breakpoint, Button, color} from "@datapunt/asc-ui"
import styled from "styled-components"
import JSONDisplay from "./JSONDisplay"
import DayPartSettings from "./DayPartSettings"
import ProjectsCheckboxes from "./ProjectCheckboxes"
import useGlobalState from "../../hooks/useGlobalState"
import ErrorMessage from "../global/ErrorMessage"
import SuccessMessage from "../global/SuccessMessage"
import SmallSpinner from "../global/SmallSpinner"
import Spinner from "../global/Spinner"
import {isRequired} from "../form-components/validators/isRequired"
import TextField from "../form-components/TextField"

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
const Column = styled(Div)`
  break-inside: avoid-column;
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

export type DayPartConfig = {
  day: Day
  dayPart: DayPart
  title: string
}

const DAY_PARTS:DayPartConfig[] = [
  {day: 'monday', dayPart: 'day', title: 'Maandag'},
  {day: 'tuesday', dayPart: 'day', title: 'Dinsdag'},
  {day: 'wednesday', dayPart: 'day', title: 'Woensdag'},
  {day: 'thursday', dayPart: 'day', title: 'Donderdag'},
  {day: 'friday', dayPart: 'day', title: 'Vrijdag'},
]

const WEEKEND:DayPartConfig[] = [
  {day: 'saturday', dayPart: 'day', title: 'Zaterdag weekend'},
  {day: 'sunday', dayPart: 'day', title: 'Zondag weekend'},
]

const EVENINGS:DayPartConfig[] = [
  {day: 'monday', dayPart: 'evening', title: 'Maandag avond'},
  {day: 'tuesday', dayPart: 'evening', title: 'Dinsdag avond'},
  {day: 'wednesday', dayPart: 'evening', title: 'Woensdag avond'},
  {day: 'thursday', dayPart: 'evening', title: 'Donderdag avond'},
  {day: 'friday', dayPart: 'evening', title: 'Vrijdag avond'}
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
      values.maps
    )
  }

  return isFetching
  ? <Spinner />
  : <Wrap>
        <Form
          onSubmit={onSubmit}
          initialValues={data?.settings}
          render={({ handleSubmit, values, hasValidationErrors, submitSucceeded, dirty }) => (<>
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

              { [DAY_PARTS, WEEKEND, EVENINGS].map(row => (
                <ColumnWrap>
                  { row.map(dayPartConfig => (
                    <Column>
                      <DayPartSettings key={dayPartConfig.title} stadia={data?.stadia ?? []} {...dayPartConfig} />
                    </Column>
                  ))}
                </ColumnWrap>
              )) }

              <ButtonWrap>
                { errorMessage && <ErrorMessage text={ errorMessage! } /> }
                { submitSucceeded && !dirty && !isUpdating && !errorMessage && <SuccessMessage text='Succesvol opgeslagen' /> }
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
