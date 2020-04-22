import React from "react"
import styled from "styled-components"
import {StadiumSettings} from "./StadiumSettings"
import {isNotIntersectingWith} from "../form-components/validators/isNotIntersectingWith"
//import {combineValidators} from "../form-components/validators/combineValidators"
//import {isRequired} from "../form-components/validators/isRequired"
import SelectField from "../form-components/SelectField"
import {Field} from "react-final-form"

type Props = {
  title: string,
  index: number
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

const getFieldName = (dayIndex:number, name:string) =>
  `lists[${dayIndex}].${name}`

const DayPartSettings:React.FC<Props> = ({index: dayIndex, title, day, dayPart, stadia}) => {
  const primaryStadium = getFieldName(dayIndex, 'primary_stadium')
  const secondaryStadia = getFieldName(dayIndex, 'secondary_stadia')
  const excludeStadia = getFieldName(dayIndex, 'exclude_stadia')
  const dayName = getFieldName(dayIndex, 'day')
  const dayPartName = getFieldName(dayIndex, 'dayPart')
  const options = stadia.reduce((acc, stadium) => ({ ...acc, [stadium]:stadium }), { '': 'Geen' })

  return (
    <Wrap>
      <Field name={dayName} component='input' type='hidden' initialValue={day} />
      <Field name={dayPartName} component='input' type='hidden' initialValue={dayPart} />

      <h1>{title}</h1>
      <H4>1. Zoveel mogelijk</H4>
      <SelectField name={primaryStadium} options={options} />

      <H4>2. Aanvullen met</H4>
      <StadiumSettings
        fieldName={secondaryStadia}
        stadia={stadia}
        validate={isNotIntersectingWith(excludeStadia)}
      />

      <H4>3. Uitsluiten</H4>
      <StadiumSettings
        fieldName={excludeStadia}
        stadia={stadia}
        validate={isNotIntersectingWith(secondaryStadia)}
      />
    </Wrap>
  )
}

export default React.memo(DayPartSettings)
