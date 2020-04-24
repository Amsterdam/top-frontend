type Action =
  | { type: "START_FETCHING" }
  | { type: "SET_RESULTS", payload: { results: Users } }
  | { type: "SET_ERROR", payload: { errorMessage: ErrorMessage } }
  | { type: "CLEAR" }

export const createStartFetching = (): Action => ({ type: "START_FETCHING" })
export const createSetResults = (results: Users): Action => ({ type: "SET_RESULTS", payload: { results } })
export const createSetError = (errorMessage: ErrorMessage): Action => ({ type: "SET_ERROR", payload: { errorMessage } })
export const createClear = (): Action => ({ type: "CLEAR" })

export const initialState: UsersState = {
  isFetching: false,
  errorMessage: undefined,
  results: undefined
}

const reducer = (state: UsersState, action: Action): UsersState => {
  switch (action.type) {
    case "START_FETCHING": {
      const isFetching = true
      const errorMessage = undefined
      const results = undefined
      return { ...state, isFetching, results, errorMessage }
    }
    case "SET_RESULTS": {
      const isFetching = false
      const { results } = action.payload
      return { ...state, isFetching, results }
    }
    case "SET_ERROR": {
      const isFetching = false
      const { errorMessage } = action.payload
      return { ...state, isFetching, errorMessage }
    }
    case "CLEAR":
      return initialState
    default:
      return state
  }
}

export default reducer
