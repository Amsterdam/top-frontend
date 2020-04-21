import React, { FC } from "react"
import FraudProbabilityLabel from "./FraudProbabiltyLabel"

type Props = {
  fraudProbability: number
  className?: string
}

const FraudProbability: FC<Props> = ({ fraudProbability, className }) => (
  <FraudProbabilityLabel className={className}>
    {Math.round(fraudProbability * 100)}%
  </FraudProbabilityLabel>
)

export default FraudProbability
