import { useCallback } from "react"
import { StateContextInitializer } from "./useCreateInitializeFunction"

const useCreateAuthenticateFunction = (authActions: AuthActions, initialize: StateContextInitializer) => {
  const authenticate = (token: AuthToken, user: AuthUser) => {
    const isSuccess = authActions.authenticate(token, user)
    if (isSuccess) initialize()
  }
  return useCallback(authenticate, [])
}


export default useCreateAuthenticateFunction
