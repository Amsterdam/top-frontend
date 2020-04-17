import React, { FC } from "react"
import Emoji from "./Emoji"

type Props = {
  fraudProbability: number
  className?: string
}

const FraudProbability: FC<Props> = ({ fraudProbability, className }) => {
  const fraudProbabilityPercentage = Math.round(fraudProbability * 100)
  return <span className={ className }><Emoji text="🤖" /> { fraudProbabilityPercentage }%</span>
}
export default FraudProbability
