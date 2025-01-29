import { useCallback, useContext, useEffect } from "react"
import { ApiContext } from "../provider/ApiProvider"
import { ApiGroup } from "../index"
import useProtectedRequest from "./useProtectedRequest"
import useRequest from "./useRequest"
import useNavigation from "app/features/shared/routing/useNavigation"
import type { HandleError } from "./utils/utils"

type GetOptions = {
  method: "get"
}

type MutateOptions = {
  method: "post" | "put" | "patch" | "delete"
  skipCacheClear?: boolean
  useResponseAsCache?: boolean
}

const isGetOptions = (options: any): options is GetOptions =>
  options.method === "get"

const isMutateOptions = (options: any): options is MutateOptions =>
  [ "post", "put", "patch", "delete" ].includes(options.method)

type Config = {
  keepUsingInvalidCache?: boolean
  lazy?: boolean
  url: string
  groupName: ApiGroup
  handleError?: HandleError
  isProtected?: boolean
  noForbiddenRedirect?: boolean
}

const useApiRequest = <Schema, Payload = Partial<Schema>> (
  {
    url,
    groupName,
    handleError,
    isProtected,
    lazy,
    keepUsingInvalidCache,
    noForbiddenRedirect
  }: Config) => {
  const {
    getCacheItem,
    setCacheItem,
    updateCacheItem,
    addErrorToCacheItem,
    clearCache,
    pushRequestInQueue,
    isRequestPendingInQueue
  } = useContext(ApiContext)[groupName]
  const { navigateTo } = useNavigation()
  const request = useRequest()
  const protectedRequest = useProtectedRequest()

  /**
   * Executes an API request
   */
  const execRequest = useCallback(async (options: GetOptions | MutateOptions, payload?: Payload) => {
    try {
      if (isMutateOptions(options) && !options.skipCacheClear) {
        clearCache()
      }

      const requestMethod = isProtected ? protectedRequest : request
      const response = await requestMethod(options.method, url, payload)

      if (isGetOptions(options) || (isMutateOptions(options) && options.useResponseAsCache)) {
        setCacheItem(url, response.data)
      }

      return response
    } catch (error: any) {
      addErrorToCacheItem(url, error?.response)
      if (isProtected) {
        switch (error?.response?.status) {
          case 401:
            // logout()
            break
          case 403:
            if (!noForbiddenRedirect) {
              navigateTo("/auth")
            }
            break
        }
      }
      if (handleError && error) {
        handleError(error)
      } else {
        throw error
      }
    }
  }, [isProtected, protectedRequest, request, url, clearCache, setCacheItem, addErrorToCacheItem, handleError, noForbiddenRedirect, navigateTo])

  /**
   * Queues an API request
   */
  const queueRequest = useCallback(async (options: GetOptions | MutateOptions, payload?: Payload) => new Promise(
    (resolve, reject) =>
      pushRequestInQueue(url, options.method, () => execRequest(options, payload)
        .then(resolve)
        .catch(reject)
      )
  ), [ execRequest, url, pushRequestInQueue ])

  /**
   * Define HTTP methods
   */
  const execGet = useCallback((options?: Omit<GetOptions, "method">) =>
    queueRequest({ method: "get", ...options }), [ queueRequest ])

  const execPost = useCallback((payload: Payload, options?: Omit<MutateOptions, "method">) =>
    queueRequest({ method: "post", ...options }, payload), [ queueRequest ])

  const execPut = useCallback((payload: Payload, options?: Omit<MutateOptions, "method">) =>
    queueRequest({ method: "put", ...options }, payload), [ queueRequest ])

  const execPatch = useCallback((payload: Payload, options?: Omit<MutateOptions, "method">) =>
    queueRequest({ method: "patch", ...options }, payload), [ queueRequest ])

  const execDelete = useCallback((options?: Omit<MutateOptions, "method">) =>
    queueRequest({ method: "delete", ...options }), [ queueRequest ])

  const updateCache = useCallback(
    (updater: (item: Schema) => void) => updateCacheItem(url, updater),
    [ updateCacheItem, url ]
  )

  // reFetch whenever our cache is invalidated
  const cacheItem = getCacheItem(url)

  const data = cacheItem && (cacheItem.valid || keepUsingInvalidCache)
    ? cacheItem.value as Schema
    : undefined

  const errors = cacheItem?.errors ?? []

  useEffect(() => {
    if ((!cacheItem || !cacheItem.valid) && !lazy) {
      execGet()
    }
  }, [ execGet, cacheItem, lazy ])

  return {
    data,
    isBusy: isRequestPendingInQueue(url, "get"),
    execGet,
    execPost,
    execPut,
    execPatch,
    execDelete,
    updateCache,
    errors
  }
}

export default useApiRequest
