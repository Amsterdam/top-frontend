import React, { FC } from "react"
import styled from "styled-components"
import { Spinner } from "@datapunt/asc-ui"
import useGlobalState from "../../hooks/useGlobalState"

const Div = styled.div`
  margin-left: 24px
`
const Label = styled.label`
  font-weight: bold
`

const PlanningSettings: FC = () => {

  const {
    planningSettings: {
      data: {
        settings: {
          opening_date: openingDate = undefined,
          opening_reasons: openingReasons = undefined
        } = {}
      } = {}
    }
  } = useGlobalState()

  const showSpinner = openingReasons === undefined
  const showOpeningDate = openingDate !== undefined
  const showOpeningReasons = openingReasons !== undefined

  return (
    <Div>
      <h2>Settings</h2>
      { showOpeningDate &&
        <>
          <Label>openings datum: </Label>
          <p>{ openingDate }</p>
        </>
      }
      { showSpinner &&
        <Spinner size={ 60 } />
      }
      { showOpeningReasons &&
        <>
          <Label>openings redenen: </Label>
          <ul>
            { openingReasons!.map((reason: string) => <li key={ reason }>{ reason }</li>) }
          </ul>
        </>
      }
    </Div>
  )
}
export default PlanningSettings
