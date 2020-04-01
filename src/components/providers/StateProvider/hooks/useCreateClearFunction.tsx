import {isLoginCallbackPage} from "../../../../config/page"

export type GlobalStateClearFunction = (errorMessage?: ErrorMessage) => void
type Clearable = () => void

const useCreateClearFunction = (unAuthenticate:AuthActions['unAuthenticate'], clearables:Clearable[]):GlobalStateClearFunction => {
  return (errorMessage?: ErrorMessage) => {
    const shouldNavigateToLogin = !isLoginCallbackPage()

    unAuthenticate(shouldNavigateToLogin, errorMessage)
    clearables.forEach(clear => clear())
  }
}

export default useCreateClearFunction
