import React from "react"
import styled from "styled-components"
import { CheckboxFields, combineValidators, isNotIntersectingWith, SelectField } from "amsterdam-react-final-form"
import { AccordionWrapper, Accordion, themeColor, themeSpacing } from "@datapunt/asc-ui"
import { arrayToObject } from "../../lib/arrayToObject"

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

const Section = styled.section`
  padding: ${ themeSpacing(2) };
  border: 1px solid ${ themeColor("tint", "level5") }
`

const H4 = styled.h4`
  margin: 18px 0 4px
`

const getFieldName = (day: Day, dayPart: DayPart, name: string) =>
  `days.${ day }.${ dayPart }.${ name }`

const DayPartSettings: React.FC<Props> = ({ title, day, dayPart, stadia }) => {
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
        validate={isNotIntersectingWith(excludeStadia, "\"{item}\" is al geselecteerd bij \"Uitsluiten\"")}
      />
      <H4>2. Aanvullen met</H4>
      <Section>
        <CheckboxFields
          name={secondaryStadia}
          options={arrayToObject(stadia)}
          validate={isNotIntersectingWith(excludeStadia, "\"{item}\" is al geselecteerd bij \"Uitsluiten\"")}
        />
      </Section>
      <H4>3. Uitsluiten</H4>
      <Section>
        <CheckboxFields
          name={excludeStadia}
          options={arrayToObject(stadia)}
          validate={
            combineValidators(
              isNotIntersectingWith(primaryStadium, "\"{item}\" is al geselecteerd bij \"Zoveel mogelijk\""),
              isNotIntersectingWith(secondaryStadia, "\"{item}\" is al geselecteerd bij \"Aanvullen met\"")
            )
          }
        />
      </Section>
      </StyledAccordion>
    </AccordionWrapper>
  )
}

export default React.memo(DayPartSettings)
