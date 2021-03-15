import React from "react"
import FraudProbability, { Props as FraudProbabilityProps } from "./FraudProbability"

const metadata = {
  component: FraudProbability,
  title: "Domain / FraudProbability",
  argTypes: {
    fraudProbability: { description: "A number between 0 and 1." }
  }
}

export default metadata

export const Example: React.VFC<FraudProbabilityProps> = () => <FraudProbability fraudProbability={ .6667 } />
