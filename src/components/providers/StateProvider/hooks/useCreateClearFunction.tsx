import { useCallback } from "react"
import { isLoginCallbackPage } from "../../../../config/page"

export type GlobalStateClearFunction = (errorMessage?: ErrorMessage) => void
type Clearable = () => void

const useCreateClearFunction = (unAuthenticate: (a: boolean, b: OErrorMessage) => void, clearables: Clearable[]): GlobalStateClearFunction => {
  const clear = (errorMessage?: ErrorMessage) => {
    const shouldNavigateToLogin = !isLoginCallbackPage()

    unAuthenticate(shouldNavigateToLogin, errorMessage)
    clearables.forEach(clear => clear())
  }
  return useCallback(clear, [])
}

export default useCreateClearFunction
