import React from "react"

export type Props = {
  fraudProbability?: number
}

/**
 * Displays a fraud probability percentage.
 * @param fraudProbability
 */
const FraudProbability: React.FC<Props> = ({ fraudProbability }) => (
  <>
    {
      fraudProbability
        ? `🤖 ${ Math.round(fraudProbability * 100) }%`
        : "🤖 % onbekend"
    }
  </>
)

export default FraudProbability
