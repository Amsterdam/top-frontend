import produce from "immer"

type Action =
  | { type: "START_FETCHING", payload: { query: Query | undefined } }
  | { type: "STOP_FETCHING" }
  | { type: "SET_RESULTS", payload: { results: SearchResults } }
  | { type: "SET_TEAM", payload: { caseId: CaseId, teamMembers?: TeamMembers } }
  | { type: "SET_ERROR", payload: { errorMessage: ErrorMessage } }
  | { type: "CLEAR" }

export const createStartFetching = (query?: Query) : Action => ({ type: "START_FETCHING", payload: { query } })
export const createStopFetching = () : Action => ({ type: "STOP_FETCHING" })
export const createSetResults = (results: SearchResults) : Action => ({ type: "SET_RESULTS", payload: { results } })
export const createSetTeam = (caseId: CaseId, teamMembers?: TeamMembers) : Action => ({ type: "SET_TEAM", payload: { caseId, teamMembers } })
export const createSetError = (errorMessage: ErrorMessage) : Action => ({ type: "SET_ERROR", payload: { errorMessage } })
export const createClear = () : Action => ({ type: "CLEAR" })

export const initialState: SearchState = {
  isFetching: false,
  query: undefined,
  results: undefined,
  errorMessage: undefined
}

const reducer = (state: SearchState, action: Action) : SearchState => {
  switch (action.type) {
    case "START_FETCHING": {
      const { query } = action.payload
      const isFetching = true
      const errorMessage = undefined
      const results = undefined
      return { ...state, isFetching, query, results, errorMessage }
    }
    case "STOP_FETCHING": {
      const isFetching = false
      return { ...state, isFetching }
    }
    case "SET_RESULTS": {
      const isFetching = false
      const { results = [] } = action.payload
      return { ...state, isFetching, results }
    }
    case "SET_ERROR": {
      const { errorMessage } = action.payload
      const isFetching = false
      return { ...state, isFetching, errorMessage }
    }
    case "SET_TEAM": {
      const { caseId, teamMembers } = action.payload
      const { results } = state
      if (results === undefined) return state
      const nextResults = produce(results, draft => {
        const index = results.findIndex(result => result.data!.cases.find(({ case_id }) => case_id === caseId) !== undefined)
        if (index > -1) draft[index].data!.cases[0].teams = teamMembers !== undefined ? [teamMembers] : undefined
      })
      return { ...state, results: nextResults }
    }
    case "CLEAR": {
      return initialState
    }
    default:
      return state
  }
}

export default reducer
