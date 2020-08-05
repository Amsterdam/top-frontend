import React from "react"

type Props = {
  fraudProbability?: number
}

const FraudProbability:React.FC<Props> = ({ fraudProbability }) => (<>
  {
    fraudProbability
      ? `🤖 ${Math.round(fraudProbability * 100)}%`
      : "🤖 % onbekend"
  }
</>)

export default FraudProbability
