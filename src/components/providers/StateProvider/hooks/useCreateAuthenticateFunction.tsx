import {StateContextInitializer} from "./useCreateInitializeFunction"
import {useRef} from "react"

const useCreateAuthenticateFunction = (authActions:AuthActions, initialize:StateContextInitializer) => {
  const authenticate = (token: AuthToken, user: AuthUser) => {
    const isSuccess = authActions.authenticate(token, user)
    if (isSuccess) initialize()
  }

  // We wrap the authenticate function in a 'ref' to ensure it never re-triggers a hook:
  // The authenticate-function itself should never change.

  const ref = useRef(authenticate)
  return ref.current
}


export default useCreateAuthenticateFunction


