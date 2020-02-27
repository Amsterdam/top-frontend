import produce from "immer"

type Indices = [number, number, number]
type Action =
  | { type: "START_FETCHING" }
  | { type: "SET_RESULTS", payload: { results: PlanningData } }
  | { type: "SET_ERROR", payload: { errorMessage: ErrorMessage } }
  | { type: "CLEAR" }
  | { type: "REMOVE_ITINERARY", payload: { indices: Indices } }
  | { type: "ADD_ITINERARY", payload: { itinerary: BWVData, indices: Indices } }

export const createStartFetching = () : Action => ({ type: "START_FETCHING" })
export const createSetResults = (results: PlanningData) : Action => ({ type: "SET_RESULTS", payload: { results } })
export const createSetError = (errorMessage: ErrorMessage) : Action => ({ type: "SET_ERROR", payload: { errorMessage } })
export const createClear = () : Action => ({ type: "CLEAR" })
export const createRemoveItinerary = (indices: Indices) : Action => ({ type: "REMOVE_ITINERARY", payload: { indices } })
export const createAddItinerary = (itinerary: BWVData, indices: Indices) : Action => ({ type: "ADD_ITINERARY", payload: { itinerary, indices } })

export const initialState: PlanningState = {
  isFetching: false,
  results: undefined,
  timestamp: undefined,
  errorMessage: undefined
}

const reducer = (state: PlanningState, action: Action) : PlanningState => {
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
      const timestamp = new Date()
      return { ...state, isFetching, results, timestamp }
    }
    case "SET_ERROR": {
      const { errorMessage } = action.payload
      const isFetching = false
      return { ...state, isFetching, errorMessage }
    }
    case "CLEAR":
      return initialState
    case "REMOVE_ITINERARY": {
      const { indices } = action.payload
      const { results } = state
      if (results === undefined) return state
      const nextResults = produce(results, draft => {
        const itinerary = draft.lists[indices[0]].itineraries[indices[1]].splice(indices[2], 1)
        draft.unplanned_cases.push(itinerary[0])
      })
      return { ...state, results: nextResults }
    }
    case "ADD_ITINERARY": {
      const { itinerary, indices } = action.payload
      const { results } = state
      if (results === undefined) return state
      const nextResults = produce(results, draft => {
        draft.lists[indices[0]].itineraries[indices[1]].push(itinerary)
        const index = draft.unplanned_cases.findIndex(item => item.case_id === itinerary.case_id)
        if (index > -1) draft.unplanned_cases.splice(index, 1)
      })
      return { ...state, results: nextResults }
    }
    default:
      return state
  }
}

export default reducer
