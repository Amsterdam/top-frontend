import { useCallback } from "react"
import { AxiosError } from "axios"
import qs from "qs"
import slashSandwich from "slash-sandwich"

import { getToken } from "app/state/auth/tokenStore"

/**
 * Default error handler:
 */
export const useErrorHandler = () => useCallback((error: AxiosError) => alert(error.message), [])

/**
 * Default headers:
 */
export const getHeaders = () => {
  const token = getToken()
  return { Authorization: `Bearer ${ token }` }
}

/**
 * Utility function to create a gateway URL.
 */
export const makeGatewayUrl = (paths: Array<number|string>, queryStringParams?:Record<string, number|string|undefined>) => {
  const path = slashSandwich([process.env.REACT_APP_GATEWAY, ...paths])

  const queryString = queryStringParams
    ? qs.stringify(queryStringParams, {addQueryPrefix: true})
    : ""

  return `${path}${queryString}`
}

