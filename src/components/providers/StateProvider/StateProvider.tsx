import React, { FC, ReactNode, useEffect } from "react"
import StateContext from "../../../contexts/StateContext"
import useCreateGlobalState from "./useCreateGlobalState"

type Props = {
  children: ReactNode
}

const StateProvider: FC<Props> = ({ children }) => {
  const { initialize, value } = useCreateGlobalState()

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <StateContext.Provider value={ value }>
      { children }
    </StateContext.Provider>
  )
}
export default StateProvider
