import deepMerge from 'deepmerge'

// NOTE: Not sure if we want to go this route
// Its hard to update on the frontend en still keep sync with the backend.
type DeepPartial<T> = T extends object ? { [P in keyof T]?: DeepPartial<T[P]>; } : T;

type Action =
  | { type: "SET_IS_FETCHING", payload: { isFetching: boolean } }
  | { type: "SET_IS_UPDATING", payload: { isUpdating: boolean } }
  | { type: "SET_ERROR", payload: { error: Error } }

type DetailAction<DETAIL> =
  | { type: "SET_DETAIL", payload: { detail: DETAIL } }

type PartialDetailAction<DETAIL> =
  | { type: "UPDATE_DETAIL", payload: { partialDetail: DeepPartial<DETAIL> } }

type ListAction<LIST> =
  | { type: "SET_LIST", payload: { list: LIST } }

type ClearAction<DETAIL, LIST> =
  | { type: "CLEAR", payload: { initialState: State<DETAIL, LIST> } }

type AllActions<DETAIL, LIST> =
  | Action
  | DetailAction<DETAIL>
  | PartialDetailAction<DETAIL>
  | ListAction<LIST>
  | ClearAction<DETAIL, LIST>

export type Error = {
  status: number
  message: string
}

export type State<DETAIL, LIST> = {
  isFetching: boolean,
  isUpdating: boolean,
  error: Error | undefined,
  detail: DETAIL | undefined,
  list: LIST
}

export const createSetIsFetching = (isFetching: boolean) : Action =>
  ({ type: "SET_IS_FETCHING", payload: { isFetching } })

export const createSetIsUpdating = (isUpdating: boolean) : Action =>
  ({ type: "SET_IS_UPDATING", payload: { isUpdating } })

export const createSetError = (error: Error) : Action =>
  ({ type: "SET_ERROR", payload: { error } })

export const createSetDetail = <DETAIL>(detail: DETAIL) : DetailAction<DETAIL> =>
  ({ type: "SET_DETAIL", payload: { detail } })

export const createUpdateDetail = <DETAIL>(partialDetail: DeepPartial<DETAIL>) : PartialDetailAction<DETAIL> =>
  ({ type: "UPDATE_DETAIL", payload: { partialDetail } })

export const createSetList = <LIST>(list: LIST) : ListAction<LIST> =>
  ({ type: "SET_LIST", payload: { list } })

export const createClear = <DETAIL, LIST>(initialState:State<DETAIL, LIST>): ClearAction<DETAIL, LIST> =>
  ({ type: "CLEAR", payload: { initialState } })

export const restReducer = <DETAIL, LIST>(state:State<DETAIL, LIST>, action:AllActions<DETAIL, LIST>):State<DETAIL, LIST> => {
  switch (action.type) {
    case 'SET_IS_FETCHING':
      return { ...state, ...action.payload }
    case 'SET_IS_UPDATING':
      return { ...state, ...action.payload }
    case 'SET_ERROR':
      return { ...state, ...action.payload }
    case 'SET_DETAIL':
      return { ...state, ...action.payload }
    case 'SET_LIST':
      return { ...state, ...action.payload }
    case 'UPDATE_DETAIL':
      return (state.detail !== undefined)
        ? { ...state, detail: deepMerge<DETAIL, DeepPartial<DETAIL>>(state.detail, action.payload.partialDetail) }
        : state
    case 'CLEAR':
      return action.payload.initialState
    default:
      return state
  }
}


