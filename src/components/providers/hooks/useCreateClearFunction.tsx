import {isLoginCallbackPage} from "../../../config/page";

export type GlobalStateClearFunction = (errorMessage?: ErrorMessage) => void
type Clearable = {
  clear: () => void
}

const useCreateClearFunction = (authActions:AuthActions, clearables:Clearable[]):GlobalStateClearFunction => {
  return (errorMessage?: ErrorMessage) => {
    const shouldNavigateToLogin = !isLoginCallbackPage()
    authActions.unAuthenticate(shouldNavigateToLogin, errorMessage)
    clearables.forEach(_ => _.clear())
  }
}

export default useCreateClearFunction
