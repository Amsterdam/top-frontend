import React, {FC, ReactNode, useEffect, useRef} from "react"
import StateContext from '../../../contexts/StateContext'
import useCreateGlobalState from "./useCreateGlobalState"

type Props = {
  children: ReactNode
}

const StateProvider: FC<Props> = ({ children }) => {
  const { initialize, value } = useCreateGlobalState()

  // We keep a reference to initialize.
  // As we don't want the useEffect to re-trigger when initialize changes.
  const initializeRef = useRef(initialize)

  useEffect(() => {
    initializeRef.current()
  }, [initializeRef])

  return (
    <StateContext.Provider value={ value }>
      { children }
    </StateContext.Provider>
  )
}
export default StateProvider
