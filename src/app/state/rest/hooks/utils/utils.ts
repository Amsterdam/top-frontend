import { useCallback, useContext } from "react"
import { AxiosError } from "axios"
import qs from "qs"
import slashSandwich from "slash-sandwich"
import { ErrorContext } from "../../../error/ErrorProvider"

const isAxiosError = (error: any): error is AxiosError => !error || error.isAxiosError

/**
 * Default error handler:
 */

export const useErrorHandler = () => {
  const { setError } = useContext(ErrorContext)

  return useCallback(async (error: AxiosError | Error) => {
    const errorMessage = isAxiosError(error) ? error.response?.data.message : error.message
    const errorSeverity = isAxiosError(error) ? error.response?.data.severity : undefined
    const errorTitle = isAxiosError(error) ? error.response?.data.title : undefined

    setError(errorMessage, errorSeverity, errorTitle)
  }, [ setError ])
}

/**
 * Utility function to create a gateway URL.
 */

export const makeGatewayUrl = (paths: Array<number | string | undefined>, queryStringParams?: Record<string, number | string | boolean | undefined>, apiVersion?: "v1" | "v2") => {
  const path = slashSandwich([ process.env.REACT_APP_GATEWAY, apiVersion || "v1", ...paths ])
  const queryString = queryStringParams
    ? qs.stringify(queryStringParams, { addQueryPrefix: true })
    : ""

  return `${ path }${ queryString }`
}
