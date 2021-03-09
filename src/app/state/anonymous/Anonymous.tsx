import React, { FC, useContext } from "react"
import { AnonymousContext } from "./AnonymousProvider"

const Anonymous: FC = () => {
  const { isAnonymous } = useContext(AnonymousContext)
  return isAnonymous
    ? <style>{ ".anonymous, .anonymous a { color: transparent; text-shadow: 0 0 15px rgba(0, 0, 0, 0.5); }" }</style>
    : null
}

export default Anonymous
