import React, { FC } from "react"
import Emoji from "./Emoji"

type Props = {
  className?: string
}

const FraudProbabilityLabel: FC<Props> = ({ children, className }) =>
  <span className={ className }><Emoji text="🤖" /> { children }</span>

export default FraudProbabilityLabel
