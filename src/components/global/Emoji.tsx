import React, { FC } from "react"

type Props = {
  text: string
}

const Emoji: FC<Props> = ({ text }) =>
  <span role="img">{ text }</span>

export default Emoji
