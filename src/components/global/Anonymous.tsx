import React, { FC } from "react"
import useGlobalState from "../../hooks/useGlobalState"

// @TODO use styled-components createGlobalStyle here
const Anonymous: FC = () => {
  const { isAnonymous } = useGlobalState()
  return isAnonymous ? <style>{ ".anonymous, .anonymous a { color: transparent; text-shadow: 0 0 15px rgba(0,0,0,0.5); }" }</style> : null
}
export default Anonymous
