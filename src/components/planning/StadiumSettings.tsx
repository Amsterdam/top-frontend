import {FormField} from "../form-components/FormComponents"
import React from "react"
import styled from "styled-components"
import {color} from "@datapunt/asc-ui"
import {isRequired} from "../form-components/validators/isRequired"

// TODO add custom checkboxes
const CheckboxRow = styled.div`
  input {
    margin: 10px;
  }
`

const Section = styled.section`
  border: 1px solid ${ color("tint", "level5") }
`

const CHECKBOXES = [
  'Onderzoek buitendienst',
  '2de Controle',
  '3de Controle',
  'Hercontrole',
  '2de hercontrole',
  '3de hercontrole',
  'Avondronde',
  'Onderzoek advertentie',
  'Weekend buitendienstonderzoek',
  'Issuemelding'
]

export type Props = {
  fieldName: string
  dayIndex: number
}

export const StadiumSettings:React.FC<Props> = ({ dayIndex, fieldName }) => (
  <Section>
    { CHECKBOXES.map((value, index) => (
      <CheckboxRow key={value}>
        <FormField
          component='input'
          id={`${fieldName}-${dayIndex}-${index}`}
          name={fieldName}
          value={value}
          type='checkbox'
          validate={isRequired}
        />
        <label htmlFor={`${fieldName}-${dayIndex}-${index}`}>
          { value }
        </label>
      </CheckboxRow>
    )) }
  </Section>
)

export default React.memo(StadiumSettings)
