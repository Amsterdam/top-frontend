import React from "react"
import styled from "styled-components"
import { Heading } from "@amsterdam/asc-ui"

import { parseShapValues } from "./utils/parseShapValues"
import { ShapValue } from "./ShapValue"

const Section = styled.section`
  border: 1px solid #B4B4B4;
  margin-bottom: 15px;
  padding: 15px;
`

type Props = {
  fraudPrediction: any
}

export const FraudPredictionDetails: React.FC<Props> = ({ fraudPrediction }) => {
  const {
    fraud_probability: fraudProbability,
    business_rules: businessRules,
    shap_values: shapValues
  } = fraudPrediction

  const percentage = Math.round(fraudProbability * 100)
  const { positive, negative } = parseShapValues(shapValues, businessRules)

  return <>
    <Heading>Voorspelling</Heading>
    <p>
      <strong>{ percentage }%</strong> kans op illegaal vakantieverhuur.
    </p>
    <Heading forwardedAs="h2">Vergroten kans</Heading>
    <Section>
      { positive.map(value => (<ShapValue key={ value.title } { ...value } isPositive={ true } />)) }
    </Section>
    <Heading forwardedAs="h2">Verkleinen kans</Heading>
    <Section>
      { negative.map(value => (<ShapValue key={ value.title } { ...value } isPositive={ false } />)) }
    </Section>
  </>
}
