import React from "react"
import styled from "styled-components"
import { Accordion, AccordionWrapper, themeSpacing } from "@datapunt/asc-ui"
import { ComposedField, Scaffold, ScaffoldFields } from "amsterdam-react-final-form"

export type CollapsibleProps = React.ComponentProps<typeof ComposedField> & {
  name: string
  isOpen?: boolean
  fields: ScaffoldFields
}

const Wrap = styled.div`
  padding: ${ themeSpacing(1) } 0;
`

/**
 * Renders a group of fields wrapped within a collapsible accordion
 */
const Collapsible: React.FC<CollapsibleProps> = ({ name, position, align, isOpen, label, fields }) => (
  <ComposedField position={position} align={align}>
    <Wrap>
      <AccordionWrapper>
        <Accordion isOpen={isOpen} title={label} >
          <Scaffold fields={fields} />
        </Accordion>
      </AccordionWrapper>
    </Wrap>
  </ComposedField>
)


export default Collapsible
