type Action =
  | { type: "START_FETCHING" }
  | { type: "STOP_FETCHING" }
  | { type: "SET_DATA", payload: { data: PlanningSettingsData } }
  | { type: "SET_ERROR", payload: { errorMessage: ErrorMessage } }
  | { type: "START_UPDATING" }
  | { type: "CLEAR" }

export const createStartFetching = (): Action => ({ type: "START_FETCHING" })
export const createStopFetching = (): Action => ({ type: "STOP_FETCHING" })
export const createSetData = (data: PlanningSettingsData): Action => ({ type: "SET_DATA", payload: { data } })
export const createSetError = (errorMessage: ErrorMessage): Action => ({ type: "SET_ERROR", payload: { errorMessage } })
export const createStartUpdating = (): Action => ({ type: "START_UPDATING" })
export const createClear = (): Action => ({ type: "CLEAR" })

export const initialState: PlanningSettingsState = {
  isFetching: false,
  isUpdating: false,
  data: undefined,
  errorMessage: undefined
}

const reducer = (state: PlanningSettingsState, action: Action): PlanningSettingsState => {
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
      const isUpdating = false
      const { data } = action.payload
      return { ...state, isFetching, isUpdating, data }
    }
    case "SET_ERROR": {
      const { errorMessage } = action.payload
      const isFetching = false
      const isUpdating = false
      return { ...state, isFetching, isUpdating, errorMessage }
    }
    case "START_UPDATING": {
      const isUpdating = true
      const errorMessage = undefined
      return { ...state, isUpdating, errorMessage }
    }
    case "CLEAR":
      return initialState
    default:
      return state
  }
}

export default reducer
