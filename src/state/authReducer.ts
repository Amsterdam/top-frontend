type Action =
  | { type: "INITIALIZE", payload: { token?: AuthToken, user?: AuthUser } }
  | { type: "START_FETCHING" }
  | { type: "AUTHENTICATE", payload: { token: AuthToken, user: AuthUser } }
  | { type: "SET_ERROR_MESSAGE", payload: { errorMessage: ErrorMessage } }
  | { type: "UNAUTHENTICATE" }

export const createInitialize = (token?: AuthToken, user?: AuthUser): Action => ({ type: "INITIALIZE", payload: { token, user } })
export const createStartFetching = (): Action => ({ type: "START_FETCHING" })
export const createAuthenticate = (token: AuthToken, user: AuthUser): Action => ({ type: "AUTHENTICATE", payload: { token, user } })
export const createSetErrorMessage = (errorMessage: ErrorMessage): Action => ({ type: "SET_ERROR_MESSAGE", payload: { errorMessage } })
export const createUnAuthenticate = (): Action => ({ type: "UNAUTHENTICATE" })

export const initialState: AuthState = {
  isInitialized: false,
  token: undefined,
  user: undefined,
  errorMessage: undefined
}

const reducer = (state: AuthState, action: Action): AuthState => {
  switch (action.type) {
    case "INITIALIZE": {
      const isInitialized = true
      const { token, user } = action.payload
      return { ...state, isInitialized, token, user }
    }
    case "AUTHENTICATE": {
      const errorMessage = undefined
      const { token, user } = action.payload
      return { ...state, errorMessage, token, user }
    }
    case "SET_ERROR_MESSAGE": {
      const { errorMessage } = action.payload
      return { ...state, errorMessage }
    }
    case "UNAUTHENTICATE": {
      const token = undefined
      const user = undefined
      return { ...state, token, user }
    }
    default:
      return state
  }
}

export default reducer
