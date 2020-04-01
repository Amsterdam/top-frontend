import React, { FC } from "react"

type Props = {
  fraudProbability: number
  className?: string
}

const FraudProbability: FC<Props> = ({ fraudProbability, className }) => {
  const fraudProbabilityPercentage = Math.round(fraudProbability * 100)
  return <span className={ className }>{ fraudProbabilityPercentage }%</span>
}
export default FraudProbability
