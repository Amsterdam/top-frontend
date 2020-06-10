import { useContext } from "react"
import stateContext, { StateContext } from "../contexts/StateContext"

const useGlobalState = () => {
  const { state } = useContext(stateContext) as StateContext
  return state
}

export default useGlobalState
