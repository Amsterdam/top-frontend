import {GlobalStateClearFunction} from "./useCreateClearFunction";
import {useRef} from "react";

type Result = (errorMessage?: ErrorMessage) => void
type Initializable = {
  initialize: () => void
}

const useCreateInitializeFunction = (
  isInitialized:boolean,
  authActions:AuthActions,
  clear:GlobalStateClearFunction,
  initializables:Initializable[]
):Result => {

  // TODO explain ref
  const initialize = useRef(async () => {
    if (isInitialized) return

    const isAuthenticated = await authActions.initialize()
    if (!isAuthenticated) return clear()

    return Promise.all(initializables.map(_ => _.initialize()))
  })

  return initialize.current
}

export default useCreateInitializeFunction
