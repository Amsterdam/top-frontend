import React from "react"
import styled from "styled-components"
import {StadiumSettings} from "./StadiumSettings"
import {isNotIntersectingWith} from "../form-components/validators/isNotIntersectingWith"
import {combineValidators} from "../form-components/validators/combineValidators"
import {isRequired} from "../form-components/validators/isRequired"
import SelectField from "../form-components/SelectField"

type Props = {
  title: string,
  day: Day,
  dayPart: DayPart,
  stadia: Stadia
}

const Wrap = styled.div`  
  padding: 20px 0;
`

const H4 = styled.h4`
  margin: 18px 0 4px
`

const getFieldName = (day:Day, dayPart:DayPart, name:string) =>
  `maps.${day}.${dayPart}.${name}`

const DayPartSettings:React.FC<Props> = ({title, day, dayPart, stadia}) => {
  const primaryStadium = getFieldName(day, dayPart, 'primary_stadium')
  const secondaryStadia = getFieldName(day, dayPart, 'secondary_stadia')
  const excludeStadia = getFieldName(day, dayPart, 'exclude_stadia')

  const options = stadia.reduce((acc, stadium) => ({ ...acc, [stadium]:stadium }), { '': 'Geen' })

  return (
    <Wrap>
      <h1>{title}</h1>
      <H4>1. Zoveel mogelijk</H4>
      <SelectField name={primaryStadium} options={options} />
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
