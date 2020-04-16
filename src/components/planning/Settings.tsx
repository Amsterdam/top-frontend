import React, { FC } from "react"
import { Form } from "react-final-form"
import { Input, breakpoint } from "@datapunt/asc-ui"
import styled from "styled-components"
import JSONDisplay from "./JSONDisplay"
import DayPartSettings from "./DayPartSettings"
import {FormField} from "../form-components/FormComponents"
import ReasonCheckboxes from "./ReasonCheckboxes"

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

const DAYS = [
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

const INITIAL_LIST = DAYS.map(day => ({ name: day }))

// @TODO these are the initialValues when we don't have any values yet. (e.g. 'Schone lei')
// Replace this object when we do have values coming
const INITIAL_VALUES = {
  lists: INITIAL_LIST
}

const Settings: FC = () => {
  const onSubmit = (values:any) => {
    console.log(values)
  }

  return (
    <Wrap>
        <Form
          onSubmit={onSubmit}
          initialValues={INITIAL_VALUES}
          render={({ handleSubmit, values }) => (<>
            <form onSubmit={handleSubmit}>
              <h1>Peildatum</h1>
              <Div>
                <DateInputWrap>
                  <FormField
                    component={Input}
                    name='opening_date'
                    type='date'
                  />
                </DateInputWrap>
              </Div>
              <ColumnWrap>
                <ReasonCheckboxes />
              </ColumnWrap>
              <ColumnWrap>
                { DAYS.map((day, index) => <DayPartSettings key={index} index={index} day={day}/>)}
              </ColumnWrap>
              <JSONDisplay json={ values } />
            </form>
          </>)}
        />
    </Wrap>
  )
}

export default Settings
