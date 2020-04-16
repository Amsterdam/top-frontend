import React, { FC } from "react"
import { Form } from "react-final-form"
import {Input, breakpoint, Spinner, Button, color} from "@datapunt/asc-ui"
import styled from "styled-components"
import JSONDisplay from "./JSONDisplay"
import DayPartSettings from "./DayPartSettings"
import {FormField} from "../form-components/FormComponents"
import ProjectsCheckboxes from "./ReasonCheckboxes"
import useGlobalState from "../../hooks/useGlobalState"
import ErrorMessage from "../global/ErrorMessage"
import SmallSpinner from "../global/SmallSpinner"
import {isRequired} from "../form-components/validators/isRequired"

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

const DAY_PARTS = [
  'Maandag',
  'Maandag avond',
  'Dinsdag',
  'Dinsdag avond',
  'Woensdag',
  'Woensdag avond',
  'Donderdag',
  'Donderdag avond',
  'Vrijdag',
  'Vrijdag avond',
  'Weekend',
  'Weekend avond'
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
                  <FormField
                    component={Input}
                    name='opening_date'
                    type='date'
                    validate={isRequired}
                  />
                </DateInputWrap>
              </Div>
              <ColumnWrap>
                <ProjectsCheckboxes />
              </ColumnWrap>
              <ColumnWrap>
                { DAY_PARTS.map((day, index) => <DayPartSettings key={index} index={index} day={day}/>)}
              </ColumnWrap>
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
