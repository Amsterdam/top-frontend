import React from "react"

import styled from "styled-components"
import { parseShapValues } from "./utils/parseShapValues"
import { ShapValue } from "./ShapValue"

const Section = styled.section`
  border: 1px solid #B4B4B4
  margin-bottom: 15px
  padding: 15px
`

type Props = {
  fraudPrediction: FraudPrediction
}

export const FraudPredictionDetails:React.FC<Props> = ({ fraudPrediction }) => {
  const {
    fraud_probability: fraudProbability,
    business_rules: businessRules,
    shap_values: shapValues
  } = fraudPrediction

  const percentage = Math.round(fraudProbability * 100)
  const { positive, negative } = parseShapValues(shapValues, businessRules)

  return <>
    <h1>Voorspelling</h1>
    <p>
      <strong>{ percentage }%</strong> kans op illegaal vakantieverhuur.
    </p>
    <h2>Vergroten kans</h2>
    <Section>
      { positive.map(value => (<ShapValue key={value.title} {...value} isPositive={true} />)) }
    </Section>
    <h2>Verkleinen kans</h2>
    <Section>
      { negative.map(value => (<ShapValue key={value.title} {...value} isPositive={false} />)) }
    </Section>
  </>
}
