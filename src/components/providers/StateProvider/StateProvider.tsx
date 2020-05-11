import React, { FC, useEffect } from "react"
import StateContext from "../../../contexts/StateContext"
import useCreateGlobalState from "./useCreateGlobalState"

const StateProvider: FC = ({ children }) => {
  const { initialize, state, actions } = useCreateGlobalState()
  const value = { state, actions }

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
