import React from "react"
import styled from "styled-components"
import {Select} from "@datapunt/asc-ui"
import {FormField} from "../form-components/FormComponents"
import {StadiumSettings} from "./StadiumSettings"
import {isNotIntersectingWith} from "../form-components/validators/isNotIntersectingWith"
import {combineValidators} from "../form-components/validators/combineValidators"
import {isRequired} from "../form-components/validators/isRequired"

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

const DayPartSettings:React.FC<Props> = ({day, index: dayIndex, stadia}) => {
  const primaryStadium = `lists[${dayIndex}].primary_stadium`
  const secondaryStadia = `lists[${dayIndex}].secondary_stadia`
  const excludeStadia = `lists[${dayIndex}].exclude_stadia`

  return (
    <Wrap>
      <h1>{day}</h1>
      <H4>1. Zoveel mogelijk</H4>

      <FormField
        name={primaryStadium}
        component={Select}
      >
        <option value="">Geen</option>
        { stadia.map(value => (<option key={value} value={value}>{value}</option>)) }
      </FormField>

      <H4>2. Aanvullen met</H4>
      <StadiumSettings
        fieldName={secondaryStadia}
        stadia={stadia}
        validate={combineValidators(isNotIntersectingWith(excludeStadia), isRequired)}
      />

      <H4>3. Uitsluiten</H4>
      <StadiumSettings
        fieldName={excludeStadia}
        stadia={stadia}
        validate={combineValidators(isNotIntersectingWith(secondaryStadia), isRequired)}
      />
    </Wrap>
  )
}

export default React.memo(DayPartSettings)
