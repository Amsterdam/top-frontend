import {Reducer, useCallback, useReducer} from "react"
import {
  restReducer,
  State,
  AllActions,
  createSetIsFetching,
  createSetError,
  createSetList,
  createSetIsUpdating, createSetDetail, createClear
} from "./restReducer"

type UrlConfig = {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE'
  url: string
}

type Config = {
  fetchList: UrlConfig
  fetchDetail: UrlConfig
  create: UrlConfig
  update: UrlConfig
  remove: UrlConfig
}

// TODO make more sophisticated :-)
const fetch = async (input: RequestInfo, init?: RequestInit): Promise<Response> =>
  window.fetch(input, init)

const useRest = <DETAIL, LIST>(initialState:State<DETAIL, LIST>, config:Config) => {
  const [state, dispatch] = useReducer<
    Reducer<
      State<DETAIL, LIST>,
      AllActions<DETAIL, LIST>
      >
  >(restReducer, initialState)

  /**
   * Makes sure `isFetching` is updated and handles errors.
   */
  const handleFetching = useCallback(async (callback: () => Promise<void>) => {
    try {
      dispatch(createSetIsFetching(true))
      await callback()
    } catch(e) {
      dispatch(createSetError({ status: e.status, message: e.message }))
    } finally {
      dispatch(createSetIsFetching(false))
    }
  }, [dispatch])

  /**
   * Makes sure `isUpdating` is updated and handles errors.
   */
  const handleUpdating = useCallback(async (callback: () => Promise<void>) => {
    try {
      dispatch(createSetIsUpdating(true))
      await callback()
    } catch(e) {
      dispatch(createSetError({ status: e.status, message: e.message }))
    } finally {
      dispatch(createSetIsUpdating(false))
    }
  }, [dispatch])

  const fetchList = useCallback(() => handleFetching(async () => {
      const response = await fetch(
        config.fetchList.url, // <- TODO replace url-params based on input
        {method: config.fetchList.method}
      )
      const json = await response.json()
      dispatch(createSetList(json))
    })
  , [handleFetching, config.fetchList.url, config.fetchList.method])

  const fetchDetail = useCallback(() => handleFetching(async () => {
      const response = await fetch(
        config.fetchDetail.url, // <- TODO replace url-params based on input
        {method: config.fetchDetail.method}
      )
      const json = await response.json()
      dispatch(createSetDetail(json))
    })
    , [handleFetching, config.fetchDetail.url, config.fetchDetail.method])

  const create = useCallback(() => handleUpdating(async () => {
    const response = await fetch(
      config.create.url, // <- TODO replace params url-based on input
      {method: config.create.method}
    )

    // TODO follow redirect to fetch detail
  }), [config.create.method, config.create.url, handleUpdating])

  const update = useCallback(() => handleUpdating(async () => {
    const response = await fetch(
      config.update.url, // <- TODO replace params based on input
      {method: config.update.method}
    )

    // TODO follow redirect to fetch detail
  }), [config.update.method, config.update.url, handleUpdating])

  const remove = useCallback(() => handleUpdating(async () => {
    const response = await fetch(
      config.remove.url, // <- TODO replace params based on input
      {method: config.remove.method}
    )

    // TODO define default behaviour on remove. (Refetch list?)
  }), [config.remove.method, config.remove.url, handleUpdating])

  const clear = useCallback(() => {
    dispatch(createClear(initialState))
  }, [initialState])

  return {
    state,
    actions: { fetchList, fetchDetail, create, update, remove, clear }
  }
}

export default useRest
