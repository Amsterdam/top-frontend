import {isLoginCallbackPage} from "../../../../config/page"
import {useRef} from "react";

export type GlobalStateClearFunction = (errorMessage?: ErrorMessage) => void
type Clearable = () => void

const useCreateClearFunction = (unAuthenticate:AuthActions['unAuthenticate'], clearables:Clearable[]):GlobalStateClearFunction => {
  const clear = (errorMessage?: ErrorMessage) => {
    const shouldNavigateToLogin = !isLoginCallbackPage()

    unAuthenticate(shouldNavigateToLogin, errorMessage)
    clearables.forEach(clear => clear())
  }

  // We wrap the initialize function in a 'ref' to ensure it never re-triggers a hook:
  // The clear-function itself should never change.

  const ref = useRef(clear)
  return ref.current
}

export default useCreateClearFunction
