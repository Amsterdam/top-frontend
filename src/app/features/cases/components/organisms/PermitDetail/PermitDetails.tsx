import React from "react"
import styled from "styled-components"
import { Heading } from "@amsterdam/asc-ui"

const Section = styled.section`
  border: 1px solid #B4B4B4;
  margin-bottom: 15px;
  padding: 15px;
`

type Props = {
  fraudPrediction: any
}

export const PermitDetails: React.FC<Props> = ({ fraudPrediction }) => (
    <>
      <Heading>Vergunning</Heading>
      <Section>
        Details go here.
      </Section>
    </>
  )
