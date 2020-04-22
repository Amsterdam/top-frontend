type Action<DETAIL, LIST> =
  | { type: "SET_IS_FETCHING", payload: { isFetching: boolean } }
  | { type: "SET_IS_UPDATING", payload: { isUpdating: boolean } }
  | { type: "SET_DETAIL", payload: { detail: DETAIL } }
  | { type: "SET_LIST", payload: { detail: LIST } }
  | { type: "CLEAR", payload: { initialState: State<DETAIL, LIST> } }

export type State<DETAIL, LIST> = {
  isFetching: boolean,
  isUpdating: boolean,
  detail?: DETAIL,
  list: LIST
}

export const createSetIsFetching = <DETAIL, LIST>(isFetching: boolean) : Action<DETAIL, LIST> =>
  ({ type: "SET_IS_FETCHING", payload: { isFetching } })

export const createSetIsUpdating = <DETAIL, LIST>(isUpdating: boolean) : Action<DETAIL, LIST> =>
  ({ type: "SET_IS_UPDATING", payload: { isUpdating } })

export const createSetDetail = <DETAIL, LIST>(detail: DETAIL) : Action<DETAIL, LIST> =>
  ({ type: "SET_DETAIL", payload: { detail } })

export const createSetList = <DETAIL, LIST>(list: LIST) : Action<DETAIL, LIST> =>
  ({ type: "SET_LIST", payload: { list } })

export const createClear = <DETAIL, LIST>(initialState:State<DETAIL, LIST>) =>
  ({ type: "CLEAR", payload: { initialState } })

export const restReducer = <DETAIL, LIST>(state:State<DETAIL, LIST>, action:Action<DETAIL, LIST>) => {
  switch (action.type) {
    case 'SET_IS_FETCHING':
      return { ...state, ...action.payload }
    case 'SET_IS_UPDATING':
      return { ...state, ...action.payload }
    case 'SET_DETAIL':
      return { ...state, ...action.payload }
    case 'SET_LIST':
      return { ...state, ...action.payload }
    case 'CLEAR':
      return action.payload.initialState
    default:
      return state
  }
}


