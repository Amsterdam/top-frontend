import React, { FC, FormEvent } from "react"
import styled from "styled-components"
import useGlobalState from "../../hooks/useGlobalState"
import useOnChangeState from "../../hooks/useOnChangeState"
import { getTitle } from "../../lib/days"
import DayInputs from "./DayInputs"
import { Button, Spinner } from "@datapunt/asc-ui"
import createPlanningRequestBody from "../../lib/createPlanningRequestBody"
import ErrorMessage from "../global/ErrorMessage"
import PlanningSettings from "./PlanningSettings"

const DayPartWrap = styled.div`
  padding-left: 150px
`
const Div = styled.div`
  display: flex
`
const Label = styled.label`
  font-weight: bold
`
const FormLabel = styled(Label)`
  display: inline-block
  width: 70px
  padding-left: 4px
  padding-bottom: 8px
`

const ButtonWrap = styled.div`
  display: flex
  justify-content: flex-end
  width: 368px
  margin-top: 36px
`

const SpinnerWrap = styled.div`
  margin-right: 24px
  display: inline-block
`

const Planning: FC = () => {

  const {
    planning: {
      isFetching,
      errorMessage
    },
    planningActions: {
      generate
    }
  } = useGlobalState()

  type Input = [string, OnChangeHandler]
  const mondayMorning = useOnChangeState("1") as unknown as Input
  const mondayAfternoon = useOnChangeState("1") as unknown as Input
  const mondayEvening = useOnChangeState("0") as unknown as Input
  const tuesdayMorning = useOnChangeState("1") as unknown as Input
  const tuesdayAfternoon = useOnChangeState("1") as unknown as Input
  const tuesdayEvening = useOnChangeState("0") as unknown as Input
  const wednesdayMorning = useOnChangeState("1") as unknown as Input
  const wednesdayAfternoon = useOnChangeState("1") as unknown as Input
  const wednesdayEvening = useOnChangeState("0") as unknown as Input
  const thursdayMorning = useOnChangeState("2") as unknown as Input
  const thursdayAfternoon = useOnChangeState("2") as unknown as Input
  const thursdayEvening = useOnChangeState("1") as unknown as Input
  const fridayMorning = useOnChangeState("2") as unknown as Input
  const fridayAfternoon = useOnChangeState("2") as unknown as Input
  const fridayEvening = useOnChangeState("0") as unknown as Input
  const saturday = useOnChangeState("1") as unknown as Input
  const sunday = useOnChangeState("1") as unknown as Input

  const inputs = [
    { title: getTitle(0), inputs: [mondayMorning, mondayAfternoon, mondayEvening] },
    { title: getTitle(1), inputs: [tuesdayMorning, tuesdayAfternoon, tuesdayEvening] },
    { title: getTitle(2), inputs: [wednesdayMorning, wednesdayAfternoon, wednesdayEvening] },
    { title: getTitle(3), inputs: [thursdayMorning, thursdayAfternoon, thursdayEvening] },
    { title: getTitle(4), inputs: [fridayMorning, fridayAfternoon, fridayEvening] },
    { title: getTitle(5), inputs: [saturday] },
    { title: getTitle(6), inputs: [sunday] }
  ]

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    const inputsNums = inputs.map(({ inputs }) => inputs.map(input => parseInt(input[0], 10))).flat(1)
    const params = createPlanningRequestBody(inputsNums)
    generate(params)
  }

  const showSpinner = isFetching
  const showError = errorMessage !== undefined

  return (
    <Div className="Planning">
      <div>
        <h2>Hoeveel lijsten per dagdeel wil je genereren?</h2>
        <form onSubmit={ onSubmit }>
          <DayPartWrap>
            <FormLabel>ochtend</FormLabel>
            <FormLabel>middag</FormLabel>
            <FormLabel>avond</FormLabel>
          </DayPartWrap>
          { inputs.map(({ title, inputs }) => <DayInputs key={ title } title={ title } inputs={ inputs } />) }
          { showError &&
            <ErrorMessage text={ errorMessage! } />
          }
          <ButtonWrap>
            { showSpinner &&
              <SpinnerWrap>
                <Spinner size={ 40 } />
              </SpinnerWrap>
            }
            <Button variant="primary" disabled={ isFetching }>Genereer looplijsten</Button>
          </ButtonWrap>
        </form>
      </div>
      <PlanningSettings />
    </Div>
  )
}
export default Planning
