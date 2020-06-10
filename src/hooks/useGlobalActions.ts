import { useContext } from "react"
import stateContext, { StateContext } from "../contexts/StateContext"

const useGlobalState = () => {
  const { actions } = useContext(stateContext) as StateContext
  return actions
}

export default useGlobalState
