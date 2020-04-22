import React, { FC, useState } from "react"
import { Form } from "react-final-form"
import { Button, Label } from "@datapunt/asc-ui"
import {Link} from "@reach/router"
import useGlobalState from "../../../hooks/useGlobalState"
import styled from "styled-components"
import isWeekDay from "../../../lib/utils/isWeekDay"
import StartAddress from "../add-start-address/StartAddress"
import Modals, {caseTo, openModalTo} from "./Modals"
import {findByProperty} from "../../../lib/utils/findByProperty"
import {filterNullish} from "../../../lib/utils/filterNullish"
import TeamMemberFields from "../TeamMemberFields"
import RadioFieldGroup from "../../form-components/RadioFieldGroup"
import NumberField from "../../form-components/NumberField"
import {isRequired} from "../../form-components/validators/isRequired"
import {getCurrentDay} from "../../../lib/utils/day"

const Div = styled.div`
  margin-bottom: 24px;
`
const StyledNumberControl = styled(NumberField)`
  width: 70px;
`

// @TODO: Use ASC Radio
const RadioButton = styled.input`
  margin-right: 8px
`
const ButtonWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`


type FormValues = {
  num: number
  dayPart: DayPart
  users: Array<undefined | null | string>
}

const getListSettingsForDayPart = (settings: PlanningSettings, dayPart: DayPart, startAddressCaseId?: string) => {
  const currentDay = getCurrentDay()

  // saturday and sundays don't do evenings:
  if (currentDay === 'saturday' || currentDay === 'sunday') {
    dayPart = 'day'
  }

  return {
    ...settings,
    days: settings.days[currentDay][dayPart],
    startAddressCaseId
  }
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
    <div>
      <h1>Genereer je looplijst</h1>
      <p>Wie zitten er vandaag in je team?</p>
      <Form
        keepDirtyOnReinitialize={true}
        onSubmit={onSubmit}
        initialValues={{
          num: 8,
          dayPart: 'day',
          users:[loggedInUser?.id]
        }}
        render={({ handleSubmit, values, hasValidationErrors }) => (
            <form onSubmit={handleSubmit}>
              <TeamMemberFields
                users={users ?? []}
                alreadySelectedUserIds={values.users}
              />
              <Div>
                <div><Label label='Wat voor looplijst wil je maken?' /></div>
                { showWeekDay
                  ? (<>
                    <RadioFieldGroup
                      horizontal={true}
                      name='dayPart'
                      options={{ day: 'daglijst', evening: 'avondlijst' }}
                    />
                  </>)
                  : (<>
                    <RadioButton id="weekend" type="radio" checked={ true } />
                    <Label label="weekend" htmlFor="weekend" />
                  </>)
                }
              </Div>
              <Div>
                <div><Label label='Hoeveel adressen wil je in je looplijst? (Max. 20)' /></div>
                <StyledNumberControl
                  min={1}
                  max={20}
                  step={1}
                  name='num'
                  validate={isRequired}
                />
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
                <Button type="submit" variant="secondary" disabled={ hasValidationErrors || isFetching }>
                  Genereer looplijst
                </Button>
              </ButtonWrap>
            </form>
        )}
        />
      <Modals onAddStartAddress={setStartAddressCaseId} />
    </div>
  )
}

export default Generate
