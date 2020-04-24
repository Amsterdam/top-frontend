import React from "react"
import styled from "styled-components"
import { AccordionWrapper, Accordion } from "@datapunt/asc-ui"
import { StadiumSettings } from "./StadiumSettings"
import { isNotIntersectingWith } from "../form-components/validators/isNotIntersectingWith"
import SelectField from "../form-components/SelectField"
import { combineValidators } from "../form-components/validators/combineValidators"

type Props = {
  title: string
  day: Day
  dayPart: DayPart
  stadia: Stadia
}

const StyledAccordion = styled(Accordion)`
  // UX wants the accordion headers bold.  
  span {
    font-weight: bold;
  }
`

const H4 = styled.h4`
  margin: 18px 0 4px
`

const getFieldName = (day:Day, dayPart:DayPart, name:string) =>
  `days.${ day }.${ dayPart }.${ name }`

const DayPartSettings:React.FC<Props> = ({ title, day, dayPart, stadia }) => {
  const primaryStadium = getFieldName(day, dayPart, "primary_stadium")
  const secondaryStadia = getFieldName(day, dayPart, "secondary_stadia")
  const excludeStadia = getFieldName(day, dayPart, "exclude_stadia")
  const options = stadia.reduce((acc, stadium) => ({ ...acc, [stadium]:stadium }), { "": "Geen" })

  return (
    <AccordionWrapper>
      <StyledAccordion title={title} isOpen={dayPart !== "evening"}>
      <H4>1. Zoveel mogelijk</H4>
      <SelectField
        name={primaryStadium}
        options={options}
        validate={isNotIntersectingWith(excludeStadia)}
      />
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
        validate={
          combineValidators(
            isNotIntersectingWith(primaryStadium),
            isNotIntersectingWith(secondaryStadia)
          )
        }
      />
      </StyledAccordion>
    </AccordionWrapper>
  )
}

export default React.memo(DayPartSettings)
