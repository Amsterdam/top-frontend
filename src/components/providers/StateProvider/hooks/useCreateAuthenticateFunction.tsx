import {StateContextInitializer} from "./useCreateInitializeFunction"

const useCreateAuthenticateFunction = (authActions:AuthActions, initialize:StateContextInitializer) =>
  (token: AuthToken, user: AuthUser) => {
    const isSuccess = authActions.authenticate(token, user)
    if (isSuccess) initialize()
}

export default useCreateAuthenticateFunction


