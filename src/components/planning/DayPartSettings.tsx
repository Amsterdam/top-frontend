import React from "react"
import styled from "styled-components"
import {Select} from "@datapunt/asc-ui"
import {FormField} from "../form-components/FormComponents"
import {StadiumSettings} from "./StadiumSettings"

type Props = {
  index: number
  day: string
  stadia: Stadia
}

const Wrap = styled.div`
  padding: 20px 0;
`

const H4 = styled.h4`
  margin: 18px 0 4px
`

const DayPartSettings:React.FC<Props> = ({day, index: dayIndex, stadia}) => (
  <Wrap>
    <h1>{day}</h1>
    <H4>1. Zoveel mogelijk</H4>

    <FormField
      name={`lists[${dayIndex}].primary_stadium`}
      component={Select}
    >
      <option value="">Geen</option>
      { stadia.map(value => (<option key={value} value={value}>{value}</option>)) }
    </FormField>

    <H4>2. Aanvullen met</H4>
    <StadiumSettings fieldName={`lists[${dayIndex}].secondary_stadia`} dayIndex={dayIndex}/>

    <H4>3. Uitsluiten</H4>
    <StadiumSettings fieldName={`lists[${dayIndex}].exclude_stadia`} dayIndex={dayIndex}/>
  </Wrap>
)

export default React.memo(DayPartSettings)
