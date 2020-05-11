import { useContext } from "react"
import stateContext from "../contexts/StateContext"

const useGlobalState = () => {
  const { state } = useContext(stateContext) as StateContextValue
  return state
}

export default useGlobalState
