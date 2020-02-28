import React, { FC } from "react"
import styled from "styled-components"
import { openingDate } from "../../config/planning"
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
        projects = undefined
      } = {}
    }
  } = useGlobalState()

  const showSpinner = projects === undefined
  const showProjects = projects !== undefined

  return (
    <Div>
      <h2>Settings</h2>
      <Label>openings datum: </Label>
      <p>{ openingDate }</p>
      <Label>openings redenen: </Label>
      { showSpinner &&
        <Spinner size={ 60 } />
      }
      { showProjects &&
        <ul>
          { projects!.map(reason => <li key={ reason }>{ reason }</li>) }
        </ul>
      }
    </Div>
  )
}
export default PlanningSettings
