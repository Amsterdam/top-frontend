import {useReducer, useRef} from "react"
import reducer, {
  initialState,
  createInitialize,
  createSetErrorMessage,
  createAuthenticate,
  createUnAuthenticate
} from "./authReducer"
import authToken from "../lib/authToken"
import authUser from "../lib/authUser"
import { get } from "../lib/utils/fetch"
import { getIsAuthenticatedUrl } from "../config/api"
import { isLoginCallbackPage } from "../config/page"
import { navigateToHome, navigateToLogin } from "../lib/navigateTo"
import logoutGrip from "../lib/logoutGrip"

const useAuth = () : [AuthState, AuthActions] => {

  const [auth, dispatch] = useReducer(reducer, initialState as never)

  const isAuthenticated = async () : Promise<boolean> => {
    const token = authToken.get()
    const hasToken = token !== undefined
    if (!hasToken) return false
    const url = getIsAuthenticatedUrl()
    // @TODO: Retry on failed GET?
    const [, result] = await get(url) as [undefined, IsAuthenticatedResponse]
    if (result === undefined) return false
    const { is_authenticated: isAuthenticated } = result
    return isAuthenticated
  }

  const initialize = async () : Promise<boolean> => {
    const isAuthorized = await isAuthenticated()
    if (isAuthorized) {
      const token = authToken.get()
      const user = authUser.get()
      dispatch(createInitialize(token, user))
      return true
    } else {
      dispatch(createInitialize())
      if (!isLoginCallbackPage()) navigateToLogin()
      return false
    }
  }

  const authenticate = (token: AuthToken, user: AuthUser) : boolean => {
    const validToken = authToken.set(token)
    if (!validToken) {
      const message = "Ongeldige auth token"
      dispatch(createSetErrorMessage(message))
      return false
    }
    authUser.set(user)
    dispatch(createAuthenticate(token, user))
    navigateToHome()
    return true
  }

  const unAuthenticate = (navigate = true, errorMessage?: string) => {
    authToken.clear()
    authUser.clear()
    logoutGrip()
    dispatch(createUnAuthenticate())
    if (errorMessage !== undefined) dispatch(createSetErrorMessage(errorMessage))
    if (navigate) navigateToLogin()
  }

  // We wrap the action-creators in a 'ref' to ensure it never re-triggers a hook:
  // The action-creators themselves should never change.
  const actionCreators = { initialize, authenticate, unAuthenticate }
  const actionCreatorsRef = useRef(actionCreators)

  return [auth, actionCreatorsRef.current]
}

export default useAuth
