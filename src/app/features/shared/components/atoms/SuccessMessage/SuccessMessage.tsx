import React from "react"

export type Props = {
  text: string
}

const SuccessMessage: React.FC<Props> = ({ text }) => (
  <div>
    <p>{ text }</p>
  </div>
)

export default SuccessMessage
