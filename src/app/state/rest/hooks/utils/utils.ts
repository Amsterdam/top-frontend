import { useCallback, useContext } from "react"
import { AxiosError } from "axios"
import qs from "qs"
import slashSandwich from "./slashSandwich"
import { ErrorContext } from "../../../error/ErrorProvider"
import { Severity } from "app/features/types"
import { env } from "app/config/env"

type ErrorResponse = {
  message?: string
  severity?: Severity
  title?: string
}

export type HandleError = (error: AxiosError<ErrorResponse>) => void

const isAxiosError = (error: any): error is AxiosError => !error || error.isAxiosError

/**
 * Default error handler:
 */

export const useErrorHandler = () => {
  const { setError } = useContext(ErrorContext)

  return useCallback(async (error: AxiosError<ErrorResponse>) => {
    let errorMessage: ErrorResponse["message"] = error?.message
    let errorSeverity: any = undefined
    let errorTitle: any = undefined
    if (isAxiosError(error)) {
      errorMessage = error?.response?.data.message
      errorSeverity = error?.response?.data?.severity
      errorTitle = error?.response?.data?.title
    }

    setError(errorMessage, errorSeverity, errorTitle)
  }, [ setError ])
}

/**
 * Utility function to create a gateway URL.
 */

export const makeGatewayUrl = (paths: Array<number | string | undefined>, queryStringParams?: Record<string, number | string | boolean | undefined>) => {
  const path = slashSandwich([ env.VITE_API_URL, ...paths ])
  const queryString = queryStringParams
    ? qs.stringify(queryStringParams, { addQueryPrefix: true })
    : ""

  return `${ path }${ queryString }`
}
