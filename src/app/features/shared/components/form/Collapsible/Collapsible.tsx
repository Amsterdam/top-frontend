import React from "react"
import styled from "styled-components"
import { Accordion, AccordionWrapper, themeSpacing } from "@amsterdam/asc-ui"
import { ComposedField, Scaffold, ScaffoldFields } from "@amsterdam/amsterdam-react-final-form"

export type CollapsibleProps = React.ComponentProps<typeof ComposedField> & {
  isOpen?: boolean
  fields: ScaffoldFields
  name?: string
}

const Wrap = styled.div`
  padding: ${ themeSpacing(1) } 0;
`

/**
 * Renders a group of fields wrapped within a collapsible accordion
 */
const Collapsible: React.FC<CollapsibleProps> = ({ position, align, isOpen, label, fields }) => (
  <ComposedField position={ position } align={ align }>
    <Wrap>
      <AccordionWrapper>
        <Accordion isOpen={ isOpen } title={ label }>
          <Scaffold fields={ fields } />
        </Accordion>
      </AccordionWrapper>
    </Wrap>
  </ComposedField>
)

export default Collapsible
