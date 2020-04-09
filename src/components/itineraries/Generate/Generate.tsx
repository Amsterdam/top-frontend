import React, { FC, useState } from "react"
import { Form, Field } from "react-final-form"
import { Button } from "@datapunt/asc-ui"
import {Link} from "@reach/router"
import H1 from "../../styled/H1"
import Input from "../../styled/Input"
import { listsDay } from "../../../config/planning"
import useGlobalState from "../../../hooks/useGlobalState"
import styled from "styled-components"
import isWeekDay from "../../../lib/utils/isWeekDay"
import StartAddress from "../add-start-address/StartAddress"
import UserDropdown from "./UserDropDown"
import Modals, {caseTo, openModalTo} from "./Modals"
import {findByProperty} from "../../../lib/utils/findByProperty"
import {filterNullish} from "../../../lib/utils/filterNullish"

const Label = styled.label`
  font-weight: bold
`
const Label2 = styled.label`
  font-weight: bold
  margin-right: 36px
`
const Div = styled.div`
  margin-bottom: 24px
`
const StyledInput = styled(Input)`
  width: 72px
`
const RadioButton = styled.input`
  margin-right: 8px
`
const ButtonWrap = styled.div`
  display: flex
  justify-content: flex-end
`

const USER_DROPDOWNS = [
  'Toezichthouder 1',
  'Toezichthouder 2',
  'Handhaver',
]

type FormValues = {
  num: number,
  dayPart: 'day' | 'evening'
  users: Array<undefined | null | string>
}

const getListSettingsForDayPart = (settings: PlanningSettings, dayPart:string, startAddressCaseId?:string) => {
  const day = (new Date()).getDay()
  const dayIndex = day - 1 < 0 ? 6 : day - 1 // correct sunday => 6
  const dayLists = listsDay(settings.lists, dayIndex)
  const lists = dayLists.length >= 3 && dayPart === "evening" ? dayLists[2] : dayLists[0]
  return {...settings, lists, startAddressCaseId}
}

const Generate: FC = () => {
  const {
    auth: {
      user: authUser
    },
    itineraries: {
      isFetching
    },
    itinerariesActions: {
      create
    },
    planningSettings: {
      data
    },
    users: {
      results: users
    }
  } = useGlobalState()

  const [startAddressCaseId, setStartAddressCaseId] = useState<CaseId | undefined>(undefined)
  const showWeekDay = isWeekDay()
  const loggedInUser = findByProperty(users, 'email', authUser?.email)

  const onSubmit = (formValues:FormValues) => {
    if (data === undefined) return
    create(
      getListSettingsForDayPart(data.settings, formValues.dayPart, startAddressCaseId),
      filterNullish(formValues.users),
      formValues.num,
      formValues.users.includes(loggedInUser?.id || '')
    )
  }

  return (
    <div className="Generate">
      <H1>Genereer je looplijst</H1>
      <p>Wie zitten er vandaag in je team?</p>
      <Form
        keepDirtyOnReinitialize={true}
        onSubmit={onSubmit}
        initialValues={{
          num: 8,
          dayPart: 'day',
          users:[loggedInUser?.id]
        }}
        render={({ handleSubmit, values }) => {
          // Could also be solved using form validation.
          // @see example: https://final-form.org/docs/react-final-form/examples/field-level-validation
          const isSubmitButtonDisabled = isFetching
            || filterNullish(values.users).length < 3
            || values.num <= 0

          return (
            <form onSubmit={handleSubmit}>
              { USER_DROPDOWNS.map((label, index) => (
                <Div key={index}>
                  <Label>{ label }</Label>
                  <Field name={`users[${index}]`}>
                    { ({input: { onChange, value }}) => (
                      <UserDropdown users={users ?? []}
                        onChange={onChange}
                        value={value}
                        excludedUsers={values.users}
                      />)}
                  </Field>
                </Div>
              )) }
              <Div>
                <p>Wat voor looplijst wil je maken?</p>
                { showWeekDay
                  ? (<>
                    <Field name='dayPart'>
                      { ({input: { onChange, value }}) => (
                        <RadioButton
                          onChange={onChange}
                          checked={value === 'day'}
                          value='day'
                          id="day"
                          type="radio"
                        />
                      )}
                    </Field>
                    <Label2 htmlFor="day">daglijst</Label2>
                    <Field name='dayPart'>
                      { ({input: { onChange, value }}) => (
                        <RadioButton
                          onChange={onChange}
                          checked={value === 'evening'}
                          value='evening'
                          id="evening"
                          type="radio"
                        />) }
                    </Field>
                    <Label2 htmlFor="evening">avondlijst</Label2>
                  </>)
                  : (<>
                    <RadioButton id="weekend" type="radio" checked={ true } />
                    <Label2 htmlFor="weekend">weekend</Label2>
                  </>)
                }
              </Div>
              <Div>
                <p>Hoeveel adressen wil je in je looplijst?</p>
                <div>
                  <Field name="num">
                    { props => <StyledInput value={props.input.value} onChange={props.input.onChange} type="number" /> }
                  </Field>
                </div>
              </Div>
              <Div>
                {
                  startAddressCaseId
                    ? (<>
                      <Div>
                        <StartAddress caseId={startAddressCaseId!} caseTo={caseTo} />
                      </Div>
                      <Div>
                        <Button type='button' variant='textButton' onClick={() => setStartAddressCaseId(undefined)}>
                          Verwijder startadres
                        </Button>
                      </Div>
                    </>)
                    : (<Div>
                      <Link to={openModalTo()}>
                        <Button type='button' variant="textButton">
                          Ik wil starten bij een specifiek adres
                        </Button>
                      </Link>
                    </Div>)
                }
              </Div>
              <ButtonWrap>
                <Button type="submit" variant="secondary" disabled={ isSubmitButtonDisabled }>
                  Genereer looplijst
                </Button>
              </ButtonWrap>
            </form>
          )
        }
        } />
      <Modals onAddStartAddress={setStartAddressCaseId} />
    </div>
  )
}

export default Generate
