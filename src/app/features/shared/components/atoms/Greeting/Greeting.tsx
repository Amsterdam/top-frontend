import React, { FC } from "react"

const Greeting: FC = () => {
  const greetings = [ "Goedenacht", "Goedemorgen", "Goedemiddag", "Goedenavond" ]
  const today = new Date()
  const hours = today.getHours()
  const index = Math.floor(hours / 6)

  return (
    <span>{ greetings[index] }</span>
  )
}

export default Greeting
