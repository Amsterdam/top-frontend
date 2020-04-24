import CheckboxField from "../form-components/CheckboxField"
import React from "react"
import styled from "styled-components"
import { color } from "@datapunt/asc-ui"
import { Label } from "@datapunt/asc-ui"
import { FieldValidator } from "final-form"

const Section = styled.section`
  border: 1px solid ${ color("tint", "level5") }
`
export type Props = {
  fieldName: string
  stadia: Stadia
  validate?: FieldValidator<string|string[]>
}

export const StadiumSettings: React.FC<Props> = ({ fieldName, stadia, validate }) => (
  <Section>
    { stadia.map(value => (
      <div key={value}>
        <Label label={value}>
          <CheckboxField
            name={fieldName}
            value={value}
            validate={validate}
          />
          </Label>
      </div>
    )) }
  </Section>
)

export default React.memo(StadiumSettings)
