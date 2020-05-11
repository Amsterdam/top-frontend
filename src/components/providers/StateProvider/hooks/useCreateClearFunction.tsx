import { useCallback } from "react"
import { isLoginCallbackPage } from "../../../../config/page"

export type GlobalStateClearFunction = (errorMessage?: ErrorMessage) => void
type Clearable = () => void

const useCreateClearFunction = (unAuthenticate: AuthActions["unAuthenticate"], clearables: Clearable[]): GlobalStateClearFunction => {
  const clear = (errorMessage?: ErrorMessage) => {
    const shouldNavigateToLogin = !isLoginCallbackPage()

    unAuthenticate(shouldNavigateToLogin, errorMessage)
    clearables.forEach(clear => clear())
  }
  return useCallback(clear, [])
}

export default useCreateClearFunction
