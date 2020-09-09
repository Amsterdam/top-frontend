import { useCallback } from "react"
import { navigate } from "@reach/router"
import { AxiosError } from "axios"
import qs from "qs"
import slashSandwich from "slash-sandwich"

import { clearToken, getToken } from "app/state/auth/tokenStore"
import to from "app/features/shared/routing/to"

const isAxiosError = (error: any): error is AxiosError => error.isAxiosError

/**
 * Default error handler:
 */
export const useErrorHandler = () => useCallback(async (error: AxiosError|Error) => {
  if (isAxiosError(error) && error.response?.status === 401) {
    clearToken()
    await navigate(to("/login"))
  }
  // Push alert to the end of the call-stack:
  setTimeout(() => alert(error.message))
}, [])

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
export const makeGatewayUrl = (paths: Array<number|string|undefined>, queryStringParams?: Record<string, number|string|undefined>) => {
  const path = slashSandwich([process.env.REACT_APP_GATEWAY, ...paths])

  const queryString = queryStringParams
    ? qs.stringify(queryStringParams, { addQueryPrefix: true })
    : ""

  return `${ path }${ queryString }`
}

