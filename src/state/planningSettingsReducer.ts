type Action =
  | { type: "START_FETCHING" }
  | { type: "STOP_FETCHING" }
  | { type: "SET_DATA", payload: { data: PlanningSettingsData } }
  | { type: "SET_ERROR", payload: { errorMessage: ErrorMessage } }
  | { type: "CLEAR" }

export const createStartFetching = () : Action => ({ type: "START_FETCHING" })
export const createStopFetching = () : Action => ({ type: "STOP_FETCHING" })
export const createSetData = (data: PlanningSettingsData) : Action => ({ type: "SET_DATA", payload: { data } })
export const createSetError = (errorMessage: ErrorMessage) : Action => ({ type: "SET_ERROR", payload: { errorMessage } })
export const createClear = () : Action => ({ type: "CLEAR" })

export const initialState: PlanningSettingsState = {
  isFetching: false,
  data: undefined,
  errorMessage: undefined
}

const reducer = (state: PlanningSettingsState, action: Action) : PlanningSettingsState => {
  switch (action.type) {
    case "START_FETCHING": {
      const isFetching = true
      const data = undefined
      const errorMessage = undefined
      return { ...state, isFetching, data, errorMessage }
    }
    case "STOP_FETCHING": {
      return { ...state, isFetching: false }
    }
    case "SET_DATA": {
      const isFetching = false
      const { data } = action.payload
      return { ...state, isFetching, data }
    }
    case "SET_ERROR": {
      const { errorMessage } = action.payload
      const isFetching = false
      return { ...state, isFetching, errorMessage }
    }
    case "CLEAR":
      return initialState
    default:
      return state
  }
}

export default reducer
