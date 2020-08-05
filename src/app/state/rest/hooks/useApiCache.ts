import { useCallback, useReducer } from "react"
import produce from "immer"

export type ApiCache = {
  getCacheItem: (key: string) => any
  setCacheItem: (key: string, value: any) => void
  updateCacheItem: (key: string, updater: (item:any) => void) => void
  clearCache: () => void
}

type State = Record<string, any>
type Action =
  | { type: "UPDATE_ITEM", key: string, updater: (item:any) => void }
  | { type: "SET_ITEM", key: string, value: any }
  | { type: "CLEAR" }

const reducer = (state: State, action: Action) => {
  switch(action.type) {
    case "UPDATE_ITEM":
      const result = produce(state[action.key], action.updater)
      return { ...state, [action.key]: result }
    case "SET_ITEM":
      return { ...state, [action.key]: action.value }
    case "CLEAR":
      return {}
  }
}

export const useApiCache = (): ApiCache => {
  const [ cache, dispatch ] = useReducer(reducer, {})

  const getCacheItem = useCallback((key: string) => cache[key], [ cache ])
  const setCacheItem = useCallback((key: string, value: any) => dispatch({ type: "SET_ITEM", key, value }), [ dispatch ])
  const updateCacheItem = useCallback((key: string, updater: (cache:any) => void) => dispatch({ type: "UPDATE_ITEM", key, updater }), [ dispatch ])
  const clearCache = useCallback(() => dispatch({ type: "CLEAR" }), [ dispatch ])

  return { getCacheItem, setCacheItem, updateCacheItem, clearCache }
}
