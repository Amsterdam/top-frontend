import React from "react"

type Props = {
  text: string
}

const SuccessMessage:React.FC<Props> = ({ text }) => (
  <div>
    <p>{ text }</p>
  </div>
)

export default SuccessMessage
