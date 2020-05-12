import { useContext } from "react"
import stateContext from "../contexts/StateContext"

const useGlobalState = () => {
  const { actions } = useContext(stateContext) as StateContextValue
  return actions
}

export default useGlobalState
